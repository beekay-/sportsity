/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sportsity.data;

import com.sportsity.bean.Venue;
import com.sportsity.bean.VenueSet;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author rustamkamberov
 */
public class VenueDB {
    
    public static VenueSet getVenues(String venueType) {
        ConnectionPool connectionPool = ConnectionPool.getInstance();
        Connection connection = connectionPool.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        String query = "SELECT * "
                        + "FROM sports as s "
                        + "WHERE s.sporttype = ? "
                        + "ORDER BY s.venueid;";
                        //+ "LIMIT 1;";
        try {
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, venueType);
            resultSet = preparedStatement.executeQuery();
            VenueSet venues = new VenueSet();
            while (resultSet.next()) {
                Venue venue = new Venue();
                venue.setVenueID(resultSet.getInt("venueid"));
                venue.setVenue(removeSpaces(resultSet.getString("asset_cd")));
                venue.setVenue(removeSpaces(resultSet.getString("steward")));
                venue.setVenue(removeSpaces(resultSet.getString("classtype")));
                venue.setVenueType(removeSpaces(resultSet.getString("sporttype")));
                venue.setFields(resultSet.getInt("numcourts"));
                venue.setLatitude(resultSet.getDouble("latitude"));
                venue.setLongitude(resultSet.getDouble("longitude"));
                venues.addVenue(venue);
            }
            return venues;
        }
        catch (SQLException e) {
            System.out.println(e);
            return null;
        }
        finally {
            DBUtil.closeResultSet(resultSet);
            DBUtil.closePreparedStatement(preparedStatement);
            connectionPool.freeConnection(connection);
        }
        
    }
    
    private static String removeSpaces(String s) {
        s = s.replaceAll("\\s+", "");
        return s;
    }
    
}
