package model;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.LoggerFactory;

import representation.DataOverview;
import statistics.QuotenStatistik;

import com.fasterxml.jackson.annotation.JsonProperty;

import analyser.DbManage;

public class MainModel {
    private static final org.slf4j.Logger logger                   = LoggerFactory.getLogger(MainModel.class);
    
    public static DataOverview generateDataoverview() {
        DataOverview overview = new DataOverview();
        overview.setComingmatches(countComingMatches());
        overview.setGametypes(countGametypes());
        overview.setMatches(countMatches());
        overview.setOddsChanges(countOddsChanges());
        overview.setResults(countResults());
        overview.setTeams(countTeams());
        int matchesWithoutResult = overview.getMatches() - overview.getComingmatches() - overview.getResults();
        overview.setMatcheswithoutresult(matchesWithoutResult);
        logger.info(overview.print());
        return overview;
    }

    private static int countMatches() {
        List<Long> list = (List<Long>) DbManage.getQuery("select count(*) from Begegnung");
        return list.get(0).intValue();
    }

    private static int countComingMatches() {
        Date d = new Date();
        List<Long> list = (List<Long>) DbManage.getQuery("select count(*) From Begegnung b where b.datum > '" + getHQLDateFormatFromDate(d)
                + "'");
        return list.get(0).intValue();
    }

    private static int countResults() {
        List<Long> list = (List<Long>) DbManage.getQuery("select count(*) from Ergebnis");
        return list.get(0).intValue();
    }

    private static int countOddsChanges() {
        List<Long> list = (List<Long>) DbManage.getQuery("select count(*) from HistoryQuote");
        return list.get(0).intValue();
    }

    private static int countTeams() {
        List<Long> list = (List<Long>) DbManage.getQuery("select count(*) from Mannschaft");
        return list.get(0).intValue();
    }

    private static int countGametypes() {
        List<Long> list = (List<Long>) DbManage.getQuery("select count(*) from Spieltyp");
        return list.get(0).intValue();
    }

    private static String getHQLDateFormatFromDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm").format(date);
    }
}
/*
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
private int mannschaften;
@JsonProperty
private int spieltypen;
*/