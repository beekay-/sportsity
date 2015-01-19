/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sportsity.bean;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author rustamkamberov
 */
public class VenueSet implements Serializable{
    
    private List<Venue> venues;
    
    public VenueSet() {
         this.venues = new ArrayList<Venue>();
    }
    
    public VenueSet(List<Venue> venues) {
        this.venues = venues;
    }

    public void addVenue(Venue venue) {
        if (venue == null) {
            System.exit(0);
        }
        venues.add(venue);
    }
    
    /**
     * @return the venues
     */
    public List<Venue> getVenues() {
        List<Venue> newVenues = new ArrayList<Venue>();
        return newVenues;
    }

    /**
     * @param venues the venues to set
     */
    public void setVenues(List<Venue> venues) {
        this.venues = venues;
    }
    
}
