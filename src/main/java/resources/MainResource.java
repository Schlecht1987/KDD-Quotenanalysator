/*
 * 
 */
package resources;

import java.io.FileInputStream;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// TODO: Auto-generated Javadoc
/**
 * The Class MainResource.
 *
 * @author hendrik
 * @formatter:off
 */
@Path("/")
@Produces("text/html;charset=UTF-8")
public class MainResource {

    /** The Constant LOG. */
    private static final Logger LOG = LoggerFactory.getLogger(MainResource.class);

    /**
     * Gets the main view.
     *
     * @return the main view
     */
    @GET
    public Response getMainView() {
        try (FileInputStream inputStream = new FileInputStream("client/dist/index.html")) {
            String html = IOUtils.toString(inputStream);
            return html != null ? Response.ok().entity(html).build() : Response.serverError().build();
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return Response.serverError().build();
        }
    }

}