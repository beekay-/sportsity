/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sportsity.bean;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author rustamkamberov
 */
public class VenueTester {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        
        VenueSet vs = new VenueSet();
        Venue v1 = new Venue(1, "Venue #1", 54.234234234, -114.24234234, "tennis", 3);
        Venue v2 = new Venue(2, "Venue #2", 54.212312334234, -112.24234234, "socces", 2);
        Venue v3 = new Venue(3, "Venue #3", 54.212312334234, -112.24234234, "cricket", 3);
        Venue v4 = new Venue(4, "Venue #4", 54.212312334234, -112.24234234, "basketball", 1);
        
        vs.addVenue(v1);
        vs.addVenue(v2);
        vs.addVenue(v3);
        vs.addVenue(v4);
        
        List<Venue> newSet = new ArrayList<Venue>();
        newSet = vs.getVenues();
        
        System.out.println(vs.toString());
        System.out.println("------------------");
        for (Venue v : newSet) {
            System.out.println(v.toString());
        }    
        Venue v5 = new Venue(5, "Venue #5", 54.777, -112.777, "karate", 1);
        newSet.add(v5);
        
        System.out.println("-----5th venue added-------");
        for (Venue v : newSet) {
            System.out.println(v.toString());
        }
        
        System.out.println("-----The initial array-------");
        System.out.println(vs.toString());
    }
    
}
