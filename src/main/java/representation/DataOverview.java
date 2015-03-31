package representation;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DataOverview {

    @JsonProperty
    private int comingmatches;
    @JsonProperty
    private int results;
    @JsonProperty
    private int matches;
    @JsonProperty
    private int matcheswithoutresult;
    @JsonProperty
    private int oddsChanges;
    @JsonProperty
    private int teams;
    @JsonProperty
    private int gametypes;

    public int getComingmatches() {
        return comingmatches;
    }

    public void setComingmatches(int comingmatches) {
        this.comingmatches = comingmatches;
    }

    public int getResults() {
        return results;
    }

    public void setResults(int results) {
        this.results = results;
    }

    public int getMatches() {
        return matches;
    }

    public void setMatches(int matches) {
        this.matches = matches;
    }

    public int getMatcheswithoutresult() {
        return matcheswithoutresult;
    }

    public void setMatcheswithoutresult(int matcheswithoutresult) {
        this.matcheswithoutresult = matcheswithoutresult;
    }

    public int getOddsChanges() {
        return oddsChanges;
    }

    public void setOddsChanges(int oddsChanges) {
        this.oddsChanges = oddsChanges;
    }

    public int getTeams() {
        return teams;
    }

    public void setTeams(int teams) {
        this.teams = teams;
    }

    public int getGametypes() {
        return gametypes;
    }

    public void setGametypes(int gametypes) {
        this.gametypes = gametypes;
    }

    public String print() {
        return "comming matches: " + this.comingmatches + " results: " + this.results + " matches:" + this.matches
                + " matches without result:" + matcheswithoutresult + " teams:" + this.teams + " gametypes: " + this.gametypes
                + " odds changes: " + this.oddsChanges;
    }

}
