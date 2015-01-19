package com.sportsity.bean;

import java.io.Serializable;

public class Venue implements Serializable{
    
    private int venueID;
    private String venue;
    private double latitude;
    private double longitude;
    private String venueType;
    private int fields;
    
    /**
     * A no-argument constructor
     */
    public Venue() {
        this.venueID = 0;
        this.venue = "";
        this.latitude = 0;
        this.longitude = 0;
        this.venueType = "";
        this.fields = 0;
    }
        
    public Venue(int venueID, String venue, double latitude,
                double longitude, String venueType, int fields) {
        this.venueID = venueID;
        this.venue = venue;
        this.latitude = latitude;
        this.longitude = longitude;
        this.venueType = venueType;
        this.fields = fields;
    }
    
    /**
     * @return the venueID
     */
    public int getVenueID() {
        return venueID;
    }

    /**
     * @param venueID the venueID to set
     */
    public void setVenueID(int venueID) {
        this.venueID = venueID;
    }

    /**
     * @return the vanue
     */
    public String getVenue() {
        return venue;
    }

    /**
     * @param vanue the vanue to set
     */
    public void setVenue(String venue) {
        this.venue = venue;
    }

    /**
     * @return the latitude
     */
    public double getLatitude() {
        return latitude;
    }

    /**
     * @param latitude the latitude to set
     */
    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    /**
     * @return the longitude
     */
    public double getLongitude() {
        return longitude;
    }

    /**
     * @param longitude the longitude to set
     */
    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    /**
     * @return the venueType
     */
    public String getVenueType() {
        return venueType;
    }

    /**
     * @param venueType the venueType to set
     */
    public void setVenueType(String venueType) {
        this.venueType = venueType;
    }

    /**
     * @return the fields
     */
    public int getFields() {
        return fields;
    }

    /**
     * @param fields the fields to set
     */
    public void setFields(int fields) {
        this.fields = fields;
    }
    
    
}
