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
    
    public static boolean venueExists(int venueId) {
        ConnectionPool connectionPool = ConnectionPool.getInstance();
        Connection connection = connectionPool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String query = "SELECT l.venue_id "
                        + "FROM likability as l "
                        + "WHERE venue_id = ?";
        try {
            ps = connection.prepareStatement(query);
            ps.setInt(1, venueId);
            rs = ps.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            connectionPool.freeConnection(connection);
        }
    }
    
    public static int insert(int venueId) {
        ConnectionPool connectionPool = ConnectionPool.getInstance();
        Connection connection  = connectionPool.getConnection();
        PreparedStatement ps = null;
        String query = "INSERT INTO likability (venue_id, likability) "
                        + "VALUES (?, 1);";
        try {
            ps = connection.prepareStatement(query);
            ps.setInt(1, venueId);
            return ps.executeUpdate();

        } catch (SQLException e) {
            System.out.println(e);
            return 0;
        } finally {
            DBUtil.closePreparedStatement(ps);
            connectionPool.freeConnection(connection);
        }
        
    }
    
    public static int updateLikability(int venueId) {
        ConnectionPool connectionPool = ConnectionPool.getInstance();
        Connection connection  = connectionPool.getConnection();
        PreparedStatement ps = null;
        String query = "UPDATE likability SET likability = likability + 1 "
                        + "WHERE venue_id = ?; ";
        try {
            ps = connection.prepareStatement(query);
            ps.setInt(1, venueId);
            return ps.executeUpdate();

        } catch (SQLException e) {
            System.out.println(e);
            return 0;
        } finally {

            DBUtil.closePreparedStatement(ps);
            connectionPool.freeConnection(connection);
        }
        
    }
    
        public static int getLikabilityNumber(int venueId) {
        ConnectionPool connectionPool = ConnectionPool.getInstance();
        Connection connection  = connectionPool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        String query = "SELECT l.likability "
                        + "FROM likability as l "
                        + "WHERE l.venue_id = ?;";
        try {
            ps = connection.prepareStatement(query);
            ps.setInt(1, venueId);
            rs = ps.executeQuery();
            
            int likesNumber = 0;
            
            while (rs.next()) {
                likesNumber = rs.getInt("likability");
            }

            return likesNumber;
        } catch (SQLException e) {
            System.out.println(e);
            return 0;
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            connectionPool.freeConnection(connection);
        }
        
    }
    
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
                venue.setVenueSteward(resultSet.getString("steward").toLowerCase());
                venue.setVenue(removeSpaces(resultSet.getString("classtype")));
                venue.setVenueType(removeSpaces(resultSet.getString("sporttype").toLowerCase()));
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
