package model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import representation.Match;
import mapping.Begegnung;
import mapping.Ergebnis;
import mapping.HistoryQuote;
import mapping.Quote;
import analyser.DbManage;
import analyser.MakeQuery;

public class BegegnungModel {

    public static boolean findBegegnungErgebnis(int begegnungsID) {

        List<Ergebnis> erg = (List<Ergebnis>) DbManage.getQuery("from Ergebnis where begegnung = " + begegnungsID);
        if (erg.size() > 0) {
            return true;
        }
        return false;
    }

    public static Match mapBegegnung(Begegnung b) {
        Match m = new Match();
        m.setDatum(b.getDatum().toString());
        m.setErgebnis(findBegegnungErgebnis(b.getId()));
        m.setId(b.getId());
        m.setMannschaft_1(b.getMannschaft_1().getName());
        m.setMannschaft_2(b.getMannschaft_2().getName());
        m.setSpieltyp(b.getSpieltyp().getName());
        Quote q = getQuotebyBegegnungsId(b.getId());

        m.setQuoteM1(q.getQuoteM1());
        m.setQuoteM2(q.getQuoteM2());
        m.setQuoteX(q.getQuoteX());
        List<HistoryQuote> list = getHistoryQuoteList(b.getId());
        if (list.size() > 0) {
            m.setHasHistory(true);
            List<Float> qm1 = new ArrayList<Float>();
            List<Float> qm2 = new ArrayList<Float>();
            List<Float> qx = new ArrayList<Float>();
            List<String> date = new ArrayList<String>();
            for (int i = 0; i < list.size(); i++) {
                qm1.add(list.get(i).getQuote1());
                qm2.add(list.get(i).getQuote2());
                qx.add(list.get(i).getQuoteX());
                date.add(formatDate(list.get(i).getDatum()));
            }
            m.setHistoryQM1(qm1);
            m.setHistoryQM2(qm2);
            m.setHistoryQX(qx);
            m.setHistoryDate(date);
        }
        m.setQuotenkey(caluclateQuoteKey(m.getQuoteM1(),m.getQuoteM2(),m.getQuoteX()));
        m.setQuoteM1Chance(calculateQuoteChance(m.getQuoteM1()));
        m.setQuoteM2Chance(calculateQuoteChance(m.getQuoteM2()));
        m.setQuoteXChance(calculateQuoteChance(m.getQuoteX()));
        return m;
    }
    
    public static String formatDate(Date date){
        try {
            return new SimpleDateFormat("MM-dd HH:mm").format(date);
        } catch (Exception e) {
            // TODO: handle exception
        }
        return date.toString();
    }
    public static float caluclateQuoteKey(float qm1, float qm2, float qx){
        float erg = 0;
        erg = (1f / (1f/qm1 + 1f/qm2 + 1f/ qx)) * 100;
        return round(erg);
    }
    
    public static float calculateQuoteChance(float q){
        float erg = 0;
        erg = (1f/q) * 100;
        return round(erg);
    }
    
    public static float round(float f) {

        return (float) Math.round(f * 10) / 10;
    }
    public static List<HistoryQuote> getHistoryQuoteList(int id) {
        List<HistoryQuote> list = (List<HistoryQuote>) DbManage.getQuery("From HistoryQuote h where h.quote =" + id);
        return list;
    }

    public static List<Match> getBegegnungen() {
        List<Match> b = new ArrayList<Match>();
        Date d = new Date();
        System.out.println(d);
        List<mapping.Begegnung> list = (List<mapping.Begegnung>) DbManage.getQuery("From Begegnung b where b.datum > '"
                + getHQLDateFormatFromDate(d) + "'");
        for (int i = 0; i < list.size(); i++) {
            b.add(BegegnungModel.mapBegegnung(list.get(i)));
        }
        return b;
    }

    private static Quote getQuotebyBegegnungsId(int id) {
        List<Quote> list = (List<Quote>) DbManage.getQuery(MakeQuery.getQuoteFromBegegnungsId(id));
        if (list.size() == 1) {
            return list.get(0);
        }
        Quote q = new Quote();
        q.setQuoteM1(0.0f);
        q.setQuoteM2(0.0f);
        q.setQuoteX(0.0f);
        ;
        return q;
    }

    private static String getHQLDateFormatFromDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }
}
