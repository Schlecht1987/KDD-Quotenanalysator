package model;

import java.util.List;

import representation.Match;
import mapping.Begegnung;
import mapping.Ergebnis;
import analyser.DbManage;

public class BegegnungModel {

    public static boolean findBegegnungErgebnis(int begegnungsID) {

        List<Ergebnis> erg = (List<Ergebnis>) DbManage.getQuery("from Ergebnis where begegnung = " + begegnungsID);
        if (erg.size() > 0) {
            return true;
        }
        return false;
    }
    
    public static Match mapBegegnung(Begegnung b){
        Match m = new Match();
        m.setDatum(b.getDatum().toString());
        m.setErgebnis(findBegegnungErgebnis(b.getId()));
        m.setId(b.getId());
        m.setMannschaft_1(b.getMannschaft_1());
        m.setMannschaft_2(b.getMannschaft_2());
        m.setSpieltyp(b.getSpieltyp().getName());           
        return m;
    }
}
