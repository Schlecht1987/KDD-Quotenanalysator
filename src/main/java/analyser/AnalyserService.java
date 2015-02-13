package analyser;


import java.util.Arrays;
import java.util.EnumSet;

import javax.servlet.DispatcherType;

import com.bazaarvoice.dropwizard.assets.AssetsBundleConfiguration;
import com.bazaarvoice.dropwizard.assets.ConfiguredAssetsBundle;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.SerializationFeature;

import resources.MainResource;
import resources.BegegnungResource;
import resources.QuotenResource;
import statistics.QuotenStatistik;
import test.HQLTest;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;


public class AnalyserService extends Application<AnalyserConfiguration> {

    

    
    
    public static void main(String[] args) throws Exception {
        // TODO Auto-generated method stub
        new AnalyserService().run(new String[] { "server", "config.yml" });
    }

  /*  @Override
    public void run(AnalyserConfiguration configuration, Environment enviroment) {
        // TODO Auto-generated method stub
        DbManage.init();
        final SayingResource resource = new SayingResource(
                configuration.getTemplate(),
                configuration.getDefaultName()
            );
        enviroment.jersey().register(resource);
    }*/

    


    /* (non-Javadoc)
     * @see io.dropwizard.Application#run(io.dropwizard.Configuration, io.dropwizard.setup.Environment)
     */
    @Override
    public void run(AnalyserConfiguration configuration, Environment environment) throws Exception {
        DbManage.init();
        environment.jersey().register(new MainResource());
        environment.jersey().register(new BegegnungResource());
        environment.jersey().register(new QuotenResource());
      
    }

    /* (non-Javadoc)
     * @see io.dropwizard.Application#initialize(io.dropwizard.setup.Bootstrap)
     */
    @Override
    public void initialize(Bootstrap<AnalyserConfiguration> bootstrap) {


        bootstrap.addBundle(new ConfiguredAssetsBundle("/assets/", "/assets"));
        bootstrap.getObjectMapper().enable(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY);
        bootstrap.getObjectMapper().enable(SerializationFeature.ORDER_MAP_ENTRIES_BY_KEYS);
    }
    

}
