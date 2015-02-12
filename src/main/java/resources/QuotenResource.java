package resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.LoggerFactory;

import model.BegegnungModel;
import representation.Match;
import representation.QuotenFilter;
import representation.QuotenOverviewRepresentation;
import statistics.QuotenInfo;
import statistics.QuotenStatistik;
import test.HQLTest;
import analyser.DbManage;

@Path("quoten")
@Produces(MediaType.APPLICATION_JSON)
public class QuotenResource {
    private final org.slf4j.Logger logger = LoggerFactory.getLogger(QuotenResource.class);

    public QuotenResource() {
        // TODO Auto-generated constructor stub
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public QuotenOverviewRepresentation gibBegegnung(QuotenFilter qF) {
        qF.print();
        
      QuotenStatistik q = new QuotenStatistik(qF.getDateFrom(),qF.getDateUntil(),qF.getQuotengenauigkeit());
   //   HQLTest hql = new HQLTest();
   //   hql.quotenOverview();
     return q.generateQuotenOverviewRepresentation();
    }
}
