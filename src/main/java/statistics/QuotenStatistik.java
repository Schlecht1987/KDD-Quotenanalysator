/*
 * 
 */
package statistics;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import analyser.DbManage;
import mapping.Ergebnis;
import mapping.Quote;
import model.QuoteModel;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonProperty;

import representation.QuotenFilter;
import representation.QuotenOverviewRepresentation;

// TODO: Auto-generated Javadoc
/**
 * The Class QuotenStatistik.
 */
public class QuotenStatistik {

    /** The list. */
    private List<QuotenInfo>       list                     = new ArrayList<QuotenInfo>();

    /** The logger. */
    private final org.slf4j.Logger logger                   = LoggerFactory.getLogger(QuotenStatistik.class);

    /** The filter. */
    private QuotenFilter           filter;

    /** The heim. */
    private final String           HEIM                     = "q.quoteM1";

    /** The unentschieden. */
    private final String           UNENTSCHIEDEN            = "q.quoteX";

    /** The gast. */
    private final String           GAST                     = "q.quoteM2";

    /** The sieg nicht heim. */
    private final String           SIEG_NICHT_HEIM          = " != '1' ";

    /** The sieg heim. */
    private final String           SIEG_HEIM                = " = '1' ";

    /** The sieg nicht unentschieden. */
    private final String           SIEG_NICHT_UNENTSCHIEDEN = " != 'x' ";

    /** The sieg unentschieden. */
    private final String           SIEG_UNENTSCHIEDEN       = " = 'x' ";

    /** The sieg nicht gast. */
    private final String           SIEG_NICHT_GAST          = " != '2' ";

    /** The sieg gast. */
    private final String           SIEG_GAST                = " = '2' ";

    /** The mannschaft. */
    private final String           MANNSCHAFT               = " and (m.id = b.mannschaft_1 or m.id = b.mannschaft_2) and ( ";

    /** The spieltyp. */
    private final String           SPIELTYP                 = " and s.id = b.spieltyp and ( ";

    /** The query mannschaft. */
    private String                 queryMannschaft          = "";

    /** The from mannschaft. */
    private String                 fromMannschaft           = "";

    /** The query spieltyp. */
    private String                 querySpieltyp            = "";

    /** The from spieltyp. */
    private String                 fromSpieltyp             = "";

    /**
     * Instantiates a new quoten statistik. setzt den Quotenfilter gloabal
     * 
     * @param filter the filter
     */
    public QuotenStatistik(QuotenFilter filter) {
        this.filter = filter;
        init();
        if (filter.isExtendedFilter()) {
            manageExtendedFilter();
        }

        getQuoten();
    }

    public QuotenInfo searchForQuote(float quote) {
        int index = 0;
        float min = Float.MAX_VALUE;
        for (int i = 0; i < list.size(); i++) {
            float temp = list.get(i).getQuote();
            if (Math.abs(temp - quote) < min) {
                index = i;
                min = Math.abs(temp - quote);
            }
        }
        return list.get(index);
    }

    /**
     * Manage extended filter.
     */
    public void manageExtendedFilter() {
        if (filter.getTeam().length > 0) {
            createMannschaftQueryString();
        } else if (filter.getGameType().length > 0) {
            createSpieltypQueryString();
        }

    }

    /**
     * Creates the spieltyp query string.
     */
    public void createSpieltypQueryString() {
        String[] spieltypen = filter.getGameType();
        querySpieltyp += SPIELTYP;
        for (int i = 0; i < spieltypen.length; i++) {
            querySpieltyp += " s.name =  '" + spieltypen[i] + "' or";
        }
        querySpieltyp = querySpieltyp.substring(0, querySpieltyp.length() - 2);
        querySpieltyp += ")";
        fromSpieltyp = ", Spieltyp s ";

    }

    /**
     * Creates the mannschaft query string.
     */
    public void createMannschaftQueryString() {
        String[] mannschaften = filter.getTeam();
        queryMannschaft += MANNSCHAFT;
        for (int i = 0; i < mannschaften.length; i++) {
            queryMannschaft += " m.name =  '" + mannschaften[i] + "' or";
        }
        queryMannschaft = queryMannschaft.substring(0, queryMannschaft.length() - 2);
        queryMannschaft += ")";
        fromMannschaft = ", Mannschaft m ";
    }

    /**
     * Ruft die verschiedenen Quotenqueries auf, die dann die Quoten entsprechend in die QuotenInfo liste einsortiert
     *
     * @return the quoten
     */
    public void getQuoten() {
        int qTyp = filter.getOddsTyp();
        if (qTyp == 1 || qTyp == 2) {
            queryQuoten(HEIM, SIEG_NICHT_HEIM, false);
            queryQuoten(HEIM, SIEG_HEIM, true);
        }
        if (qTyp == 1 || qTyp == 3) {
            queryQuoten(UNENTSCHIEDEN, SIEG_NICHT_UNENTSCHIEDEN, false);
            queryQuoten(UNENTSCHIEDEN, SIEG_UNENTSCHIEDEN, true);
        }
        if (qTyp == 1 || qTyp == 4) {
            queryQuoten(GAST, SIEG_NICHT_GAST, false);
            queryQuoten(GAST, SIEG_GAST, true);
        }
    }

    /**
     * Erzeug Liste mit allen Quoten im Bereich mit Quotengenauigkeit.
     */
    public void init() {

        for (float i = filter.getOddsRangeMin(); i <= filter.getOddsRangeMax(); i = i + filter.getOddsAccuracy()) {
            list.add(new QuotenInfo((Math.round(i * 100f) / 100f)));
        }
    }

    /**
     * Fügt eine Quote in die QuotenInfo Liste ein
     *
     * @param quote the quote
     * @param sieg the sieg
     */
    public void insertQuote(float quote, boolean sieg) {
        int index = 0;
        float min = Float.MAX_VALUE;
        for (int i = 0; i < list.size(); i++) {
            float temp = list.get(i).getQuote();
            if (Math.abs(temp - quote) < min) {
                index = i;
                min = Math.abs(temp - quote);
            }
        }
        if (sieg) {
            list.get(index).setSiege(list.get(index).getSiege() + 1);
        } else {
            list.get(index).setNiederlagen(list.get(index).getNiederlagen() + 1);
        }
    }

    /**
     * Haupt Querie, der automatisiert erzeugt wird, anhand des Quotenfilter
     *
     * @param quotenTyp Heim, Gast, Alle, Unentschieden
     * @param sieg String der prüft ob eine Quote Gewonnen oder verloren hat
     * @param siege für das einsortieren, ob eine Quote gewonnen hat oder verloren hat
     */
    public void queryQuoten(String quotenTyp, String sieg, boolean siege) {
        String query = "select " + quotenTyp + " " + "from Quote q, Begegnung b, Ergebnis e " + fromMannschaft + fromSpieltyp
                + " where q.begegnung = b.id " + "and b.id = e.begegnung " + "and e.sieger " + sieg + " " + "and " + quotenTyp + " >= "
                + filter.getOddsRangeMin() + " and " + quotenTyp + " <= " + filter.getOddsRangeMax() + " and b.datum >= '"
                + filter.getDateFrom() + "' and b.datum <= '" + filter.getDateUntil() + "' " + queryMannschaft + " " + querySpieltyp;
        logger.info("QUERY: " + query);
        List<Float> result = (List<Float>) DbManage.getQuery(query);
        for (Float float1 : result) {
            insertQuote(float1, siege);
        }

    }

    /**
     * Generate quoten overview representation. Das POST Response Objekt wird erzeugt und von der QuotenInfo Liste gemappt Berechnet alle
     * Notwendigen Statistiken
     * 
     * @return the quoten overview representation
     */
    public QuotenOverviewRepresentation generateQuotenOverviewRepresentation() {
        QuotenOverviewRepresentation qOR = new QuotenOverviewRepresentation();
        List<Float> quoten = new ArrayList<Float>();
        List<Float> prozent = new ArrayList<Float>();
        List<Integer> siege = new ArrayList<Integer>();
        List<Integer> niederlagen = new ArrayList<Integer>();
        List<Float> erwartungswert = new ArrayList<Float>();

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).isHasValues()) {
                int n = list.get(i).getNiederlagen();
                int s = list.get(i).getSiege();
                float prz = 100 * (float) s / ((float) n + (float) s);
                prz = roundQuote(prz);
                quoten.add(new Float(list.get(i).getQuote()));
                prozent.add(new Float(prz));
                siege.add(new Integer(s));
                niederlagen.add(new Integer(n));
                erwartungswert.add(new Float(roundExpecation(calculateExpectation(list.get(i).getQuote(), prz))));
            } else {
                quoten.add(new Float(list.get(i).getQuote()));
                prozent.add(new Float(-1));
                siege.add(new Integer(0));
                niederlagen.add(new Integer(0));
                erwartungswert.add(new Float(-1));
            }
        }
        qOR.setNiederlagen(niederlagen);
        qOR.setProzent(prozent);
        qOR.setQuoten(quoten);
        qOR.setSiege(siege);
        qOR.setErwartungswert(erwartungswert);

        return qOR;
    }

    /**
     * Round quote.
     *
     * @param f the f
     * @return the float
     */
    public float roundQuote(float f) {

        return (float) Math.round(f * 10) / 10;
    }

    /**
     * Round expecation.
     *
     * @param f the f
     * @return the float
     */
    public float roundExpecation(float f) {
        return (float) Math.round(f * 100) / 100;
    }

    /**
     * Gets the list.
     *
     * @return the list
     */
    public List<QuotenInfo> getList() {
        return list;
    }

    /**
     * Sets the list.
     *
     * @param list the new list
     */
    public void setList(List<QuotenInfo> list) {
        this.list = list;
    }

    /**
     * Calculate expectation.
     *
     * @param quote the quote
     * @param chance the chance
     * @return the float
     */
    public float calculateExpectation(float quote, float chance) {
        //einsatz 1 €
        float stake = 1f;
        float expectation = 0f;
        float profit = 0f;
        float loss = 0f;

        profit = stake * quote - stake;
        profit = profit * chance / 100f;

        loss = -stake;
        loss = loss * (1f - (chance / 100f));

        expectation = profit + loss;

        return expectation;
    }
}
