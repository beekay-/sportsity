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
                        + "WHERE s.venuetype = ? "
                        + "ORDER BY c.venueid;";
        try {
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, venueType);
            resultSet = preparedStatement.executeQuery();
            VenueSet venueSet = new VenueSet();
            while (resultSet.next()) {
                Venue venue = new Venue();
                venue.setVenueID(resultSet.getInt("venueid"));
                venue.setVenue(resultSet.getString("venue"));
                venue
            }
        }
        catch (SQLException e) {
            System.out.println(e);
            return null;
        }
        
    }
    
}
