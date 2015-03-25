/*
 * 
 */
package resources;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import model.BegegnungModel;
import representation.Match;
import statistics.QuotenStatistik;
import analyser.DbManage;

import com.codahale.metrics.annotation.Timed;
import com.google.common.base.Optional;

// TODO: Auto-generated Javadoc
/**
 * The Class BegegnungResource.
 */
@Path("begegnung")
@Produces(MediaType.APPLICATION_JSON)
public class BegegnungResource {
    
    /**
     * Gib begegnung.
     *
     * @return the list
     */
    @GET
    public List<Match> gibBegegnung() {
        return BegegnungModel.getBegegnungen();   
    }
}
