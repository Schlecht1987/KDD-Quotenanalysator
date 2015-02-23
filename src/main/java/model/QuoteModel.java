package model;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import analyser.DbManage;
import analyser.MakeQuery;
import mapping.Mannschaft;
import mapping.Spieltyp;
import mapping.Wettanbieter;
import representation.AllMannschaftenAndSpieltyp;





public class QuoteModel {
    
    public static AllMannschaftenAndSpieltyp getAllMannschaftenAndSpieltyp (){
        AllMannschaftenAndSpieltyp data = new AllMannschaftenAndSpieltyp();
        List<String> mannschaften = new ArrayList<String>();
        List<String> spieltypen = new ArrayList<String>();
        
        List<Mannschaft> mannschaft = null;
        mannschaft = (List<Mannschaft>) DbManage.getQuery(MakeQuery.getAllMannschaften());
        
        for (Mannschaft value : mannschaft) {
            mannschaften.add(value.getName());
        }
        
        List<Spieltyp> spieltyp = null;
        spieltyp = (List<Spieltyp>) DbManage.getQuery(MakeQuery.getAllSpieltyp());
           
        for (Spieltyp value : spieltyp) {
            spieltypen.add(value.getName());
        }
        
        data.setMannschaft(mannschaften);
        data.setSpieltyp(spieltypen);
            
        return data;
    }
    
}
