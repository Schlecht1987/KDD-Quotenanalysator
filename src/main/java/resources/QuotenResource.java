/*
 * 
 */
package resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.LoggerFactory;

import model.BegegnungModel;
import model.QuoteModel;
import representation.TeamsAndGametypes;
import representation.Match;
import representation.QuotenFilter;
import representation.QuotenOverviewRepresentation;
import statistics.QuotenInfo;
import statistics.QuotenStatistik;
import test.HQLTest;
import analyser.DbManage;

// TODO: Auto-generated Javadoc
/**
 * The Class QuotenResource.
 */
@Path("quoten")
@Produces(MediaType.APPLICATION_JSON)
public class QuotenResource {

    /** The logger. */
    private final org.slf4j.Logger logger = LoggerFactory.getLogger(QuotenResource.class);

    /**
     * Instantiates a new quoten resource.
     */
    public QuotenResource() {
        // TODO Auto-generated constructor stub
    }

    /**
     * Creates the quoten overview.
     *
     * @param qF the q f
     * @return the quoten overview representation
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public QuotenOverviewRepresentation createQuotenOverview(QuotenFilter qF) {
        QuotenStatistik q = new QuotenStatistik(qF);
        return q.generateQuotenOverviewRepresentation();
    }

    /**
     * Gets the mannschaften and spieltypen.
     *
     * @return the mannschaften and spieltypen
     */
    @Path("/inputdata/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMannschaftenAndSpieltypen() {
      
        return Response.ok(QuoteModel.getAllMannschaftenAndSpieltyp()).build();
    }
}
