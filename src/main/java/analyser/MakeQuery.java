/*
 * 
 */
package analyser;

import java.text.SimpleDateFormat;
import java.util.Date;

// TODO: Auto-generated Javadoc
/**
 * The Class MakeQuery.
 * @author Jochen
 */
public class MakeQuery {

    /**
     * Gets the specific begegnungs query.
     *
     * @param mannschaft_1 the mannschaft_1
     * @param mannschaft_2 the mannschaft_2
     * @param date the date
     * @return the specific begegnungs query
     */
    public static String getSpecificBegegnungsQuery(String mannschaft_1, String mannschaft_2, Date date) {
        String query = "from Begegnung where datum = '" + getHQLDateFormatFromDate(date) + "' AND mannschaft_1 = '" + mannschaft_1
                + "' AND mannschaft_2 = '" + mannschaft_2 + "' ";
        return query;
    }

    /**
     * Check if begegnung has already a erebnis.
     *
     * @param begegnungsID the begegnungs id
     * @return the string
     */
    public static String checkIfBegegnungHasAlreadyAErebnis(int begegnungsID) {
        String query = "from Ergebnis where begegnung = " + begegnungsID;
        return query;
    }

    /**
     * Gets the spieltyp by name query.
     *
     * @param name the name
     * @return the spieltyp by name query
     */
    public static String getSpieltypByNameQuery(String name) {
        return "from Spieltyp where name = '" + name + "'";
    }

    /**
     * Gets the wettanbieter by name query.
     *
     * @param name the name
     * @return the wettanbieter by name query
     */
    public static String getWettanbieterByNameQuery(String name) {
        return "from Wettanbieter where name = '" + name + "'";
    }

    /**
     * Gets the quote from begegnungs id.
     *
     * @param id the id
     * @return the quote from begegnungs id
     */
    public static String getQuoteFromBegegnungsId(int id) {
        return "from Quote where begegnung = " + id;
    }

    /**
     * Gets the history quote from quote id.
     *
     * @param id the id
     * @return the history quote from quote id
     */
    public static String getHistoryQuoteFromQuoteId(int id) {
        return "from HistoryQuote where quote = " + id;
    }

    /**
     * Gets the all mannschaften.
     *
     * @return the all mannschaften
     */
    public static String getAllMannschaften() {
        return "from Mannschaft";
    }
    
    /**
     * Gets the all spieltyp.
     *
     * @return the all spieltyp
     */
    public static String getAllSpieltyp() {
        return "from Spieltyp";
    }

    /**
     * Gets the HQL date format from date.
     *
     * @param date the date
     * @return the HQL date format from date
     */
    private static String getHQLDateFormatFromDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }

}
