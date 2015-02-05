package test;

import java.util.Arrays;
import java.util.List;

import org.slf4j.LoggerFactory;

import statistics.QuotenStatistik;
import mapping.Begegnung;
import mapping.Quote;
import analyser.DbManage;


public class HQLTest {
    private final org.slf4j.Logger logger = LoggerFactory.getLogger(HQLTest.class);
    private String dateQuery = "";
    
    public HQLTest(){
        
        
    }
    
    public void quotenOverview() {
        String query = "select q.quoteM1, b.mannschaft_1, b.datum "
                +"from Begegnung b, Quote q "
                +"where b.id = q.begegnung "
               +"AND b.datum >= '2014-11-24' AND b.datum <= '2014-12-24' ";
        
        String query1 = "select distinct b "
                +"from Quote q, Begegnung b, Ergebnis e, Spieltyp s "
                +"where b.id = q.begegnung "
                +"AND b.id = e.begegnung "
                +"order by b.id ";
        List<Begegnung> l = (List<Begegnung>) DbManage.getQuery(query1);
  
        for( Begegnung arr : l){
            System.out.println(arr.getId());
        }
        System.out.println(l.size());
    }
}
