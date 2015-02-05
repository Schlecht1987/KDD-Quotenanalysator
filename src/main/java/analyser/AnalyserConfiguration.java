package analyser;

import io.dropwizard.Configuration;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import com.bazaarvoice.dropwizard.assets.AssetsBundleConfiguration;
import com.bazaarvoice.dropwizard.assets.AssetsConfiguration;
import com.fasterxml.jackson.annotation.JsonProperty;




public class AnalyserConfiguration extends Configuration implements AssetsBundleConfiguration  {
    /** The assets. */
    @Valid
    @NotNull
    @JsonProperty
    private final AssetsConfiguration assets        = new AssetsConfiguration();

    public AnalyserConfiguration()
    {
        
    }
    public AssetsConfiguration getAssetsConfiguration() {
        // TODO Auto-generated method stub
        return assets;
    }

   



}
