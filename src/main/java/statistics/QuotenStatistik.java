package statistics;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import analyser.DbManage;
import mapping.Ergebnis;
import mapping.Quote;
import model.QuoteModel;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonProperty;

import representation.QuotenOverviewRepresentation;

public class QuotenStatistik {

    private List<QuotenInfo>       list;
    private final org.slf4j.Logger logger = LoggerFactory.getLogger(QuotenStatistik.class);
    private float range;

    public QuotenStatistik(String from , String until, float range) {
        this.range = range;
        list = new ArrayList<QuotenInfo>();
       // logger.info("Starting Statisik.....");
        quotenOverview(from, until);
        Collections.sort(list);
        for (int i = 0; i < list.size(); i++) {
            int niederlangen = list.get(i).getNiederlagen();
            int siege = list.get(i).getSiege();
            double prozent = 100 * (double) siege / ((double) niederlangen + (double) siege);
          //  logger.info(list.get(i).printQuotenInfo() + "  " + prozent + "%");
        }
    }

    public QuotenOverviewRepresentation generateQuotenOverviewRepresentation() {
        QuotenOverviewRepresentation qOR = new QuotenOverviewRepresentation();
        List<Float> quoten = new ArrayList<Float>();
        List<Float> prozent = new ArrayList<Float>();
        List<Integer> siege = new ArrayList<Integer>();
        List<Integer> niederlagen = new ArrayList<Integer>();

        for (int i = 0; i < list.size(); i++) {
            int n = list.get(i).getNiederlagen();
            int s = list.get(i).getSiege();
            float  prz = 100 * (float) s / ((float) n + (float) s);
            prz = roundQuote(prz);
            quoten.add(new Float(list.get(i).getQuote()));
            prozent.add(new Float(prz));
            siege.add(new Integer(s));
            niederlagen.add(new Integer(n));
        }
        qOR.setNiederlagen(niederlagen);
        qOR.setProzent(prozent);
        qOR.setQuoten(quoten);
        qOR.setSiege(siege);

        return qOR;
    }


    public void quotenOverview(String from , String until) {
        String query1 = "select distinct q "
                +"from Quote q, Begegnung b, Ergebnis e, Spieltyp s "
                +"where b.id = q.begegnung "
                +"AND b.id = e.begegnung "
                +"AND b.datum >= '"+from+"' AND b.datum <= '"+until+"' ";

        List<Quote> l = (List<Quote>) DbManage.getQuery(query1);
        logger.info("found " + l.size() + " quoten");
        for (int i = 0; i < l.size(); i++) {
            int id = l.get(i).getBegegnung().getId();
            if (getErgebnis(id) != null) {
                addQuote(l.get(i), getErgebnis(id));
            }
        }

    }

    public Ergebnis getErgebnis(int begegnungsId) {
        List<Ergebnis> erg = (List<Ergebnis>) DbManage.getQuery("from Ergebnis where begegnung = " + begegnungsId);
        if (erg.size() == 1) {
            return erg.get(0);
        } else if (erg.size() > 1) {
            logger.error("Found more than one Ergebnis for match");
            return null;
        }

        return null;
    }

    public boolean findBegegnungErgebnis(int begegnungsID) {
        List<Ergebnis> erg = (List<Ergebnis>) DbManage.getQuery("from Ergebnis where begegnung = " + begegnungsID);
        if (erg.size() > 0) {
            return true;
        }
        return false;
    }

    public void addQuote(mapping.Quote q, Ergebnis e) {

        if (e.getSieger().equals("1")) {
            addValue(roundQuote(q.getQuoteM1()), true);
            addValue(roundQuote(q.getQuoteM2()), false);
            addValue(roundQuote(q.getQuoteX()), false);
        } else if (e.getSieger().equals("2")) {
            addValue(roundQuote(q.getQuoteX()), true);
            addValue(roundQuote(q.getQuoteM1()), false);
            addValue(roundQuote(q.getQuoteM2()), false);
        } else if (e.getSieger().equals("x")) {
            addValue(roundQuote(q.getQuoteM2()), true);
            addValue(roundQuote(q.getQuoteX()), false);
            addValue(roundQuote(q.getQuoteM1()), false);
        }

    }

    public float roundQuote(float f) {

        return (float) Math.round(f * 10) / 10;
    }

    public void addValue(float q, Boolean b) {
        int index = checkIfQuoteExists(q);
        if (index == -1) {
            QuotenInfo value = new QuotenInfo();
            value.setQuote(q);
            if (b) {
                value.setSiege(value.getSiege() + 1);
            } else {
                value.setNiederlagen(value.getNiederlagen() + 1);
            }
            list.add(value);
        } else {
            if (b) {
                list.get(index).setSiege(list.get(index).getSiege() + 1);
            } else {
                list.get(index).setNiederlagen(list.get(index).getNiederlagen() + 1);
            }
        }
    }

    public int checkIfQuoteExists(float quote) {
        for (int i = 0; i < list.size(); i++) {
            if (Math.abs(list.get(i).getQuote() - quote) < range) {
                return i;
            }
        }
        return -1;
    }

    public List<QuotenInfo> getList() {
        return list;
    }

    public void setList(List<QuotenInfo> list) {
        this.list = list;
    }
}
