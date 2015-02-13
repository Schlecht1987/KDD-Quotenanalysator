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

public class QuotenStatistik {

    private List<QuotenInfo>       list                     = new ArrayList<QuotenInfo>();
    private final org.slf4j.Logger logger                   = LoggerFactory.getLogger(QuotenStatistik.class);
    private QuotenFilter           filter;
    private final String           HEIM                     = "q.quoteM1";
    private final String           UNENTSCHIEDEN            = "q.quoteX";
    private final String           GAST                     = "q.quoteM2";
    private final String           SIEG_NICHT_HEIM          = " != '1' ";
    private final String           SIEG_HEIM                = " = '1' ";
    private final String           SIEG_NICHT_UNENTSCHIEDEN = " != 'x' ";
    private final String           SIEG_UNENTSCHIEDEN       = " = 'x' ";
    private final String           SIEG_NICHT_GAST          = " != '2' ";
    private final String           SIEG_GAST                = " = '2' ";

    public QuotenStatistik(QuotenFilter filter) {
        this.filter = filter;
        init();
        getQuoten();
    }

    public void getQuoten() {
        int qTyp = filter.getQuotenTyp();
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
     * Erzeug Liste mit allen Quoten im Bereich mit Quotengenauigkeit
     */
    public void init() {

        for (float i = filter.getQuotenRangemin(); i < filter.getQuotenRangeMax(); i = i + filter.getQuotengenauigkeit()) {
            list.add(new QuotenInfo((Math.round(i * 100f) / 100f)));
            //  logger.info("Neue Quote hinzugefügt: " + (Math.round(i * 100f) / 100f));
        }
    }

    public void insertQuote(float quote, boolean sieg) {
        int index = 0;
        float min = Float.MAX_VALUE;
        for (int i = 0; i < list.size(); i++) {
            float temp = list.get(i).getQuote();
            if (Math.abs(temp - quote) < min) {
                index = i;
                min = Math.abs(temp - quote);
            }
            //  logger.info("min: "+min+" betrag: "+Math.abs(temp-quote));
        }
        if (sieg) {
            list.get(index).setSiege(list.get(index).getSiege() + 1);
        } else {
            list.get(index).setNiederlagen(list.get(index).getNiederlagen() + 1);
        }
        //     logger.info("Sotierung der Quote: " + quote + " in die Quote: " + list.get(index).getQuote());
    }

    public void queryQuoten(String quotenTyp, String sieg, boolean siege) {
        String query = "select " + quotenTyp + " " + "from Quote q, Begegnung b, Ergebnis e " + "where q.begegnung = b.id "
                + "and b.id = e.begegnung " + "and e.sieger " + sieg + " " + "and q.quoteM1 between " + filter.getQuotenRangemin()
                + " and " + filter.getQuotenRangeMax() + " ";

        List<Float> result = (List<Float>) DbManage.getQuery(query);
        for (Float float1 : result) {
            insertQuote(float1, siege);
        }

    }

    public QuotenOverviewRepresentation generateQuotenOverviewRepresentation() {
        QuotenOverviewRepresentation qOR = new QuotenOverviewRepresentation();
        List<Float> quoten = new ArrayList<Float>();
        List<Float> prozent = new ArrayList<Float>();
        List<Integer> siege = new ArrayList<Integer>();
        List<Integer> niederlagen = new ArrayList<Integer>();

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
            }
        }
        qOR.setNiederlagen(niederlagen);
        qOR.setProzent(prozent);
        qOR.setQuoten(quoten);
        qOR.setSiege(siege);

        return qOR;
    }

    public float roundQuote(float f) {

        return (float) Math.round(f * 10) / 10;
    }

    public List<QuotenInfo> getList() {
        return list;
    }

    public void setList(List<QuotenInfo> list) {
        this.list = list;
    }
}
