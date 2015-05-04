/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sportsity.servlets;

import com.google.gson.Gson;

import com.sportsity.data.VenueDB;
import com.sportsity.util.CookieUtil;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author rustamkamberov
 */
@WebServlet(name = "GetLikability", urlPatterns = {"/getLikability"})
public class GetLikability extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        
        
        String action = request.getParameter("action");
        String venueIDString = request.getParameter("venueID");
        int venueID = Integer.parseInt(venueIDString);
        
        Cookie[] cookies = request.getCookies();
        String venC = CookieUtil.getCookieValue(cookies, "venueIDCookie".concat(venueIDString));
        
        int likeNumber = 0;
        System.out.println("venC: " + venC);
        if (action.equals("update likability status")){
            if (!venC.equals(venueIDString)) {
                Cookie venueCookie = new Cookie("venueIDCookie".concat(venueIDString), venueIDString);
                System.out.println("venueCookie value:" + venueCookie.getValue());
                System.out.println("venueCookie name:" + venueCookie.getName());
                venueCookie.setMaxAge(60*60*24*365);
                response.addCookie(venueCookie);
                
                
                if (VenueDB.venueExists(venueID)){
                    VenueDB.updateLikability(venueID);
                } 
                else {
                    VenueDB.insert(venueID);
                }

                likeNumber = VenueDB.getLikabilityNumber(venueID);
                System.out.println("Likability: " + likeNumber);
            }    
            else {
                if (VenueDB.venueExists(venueID)) {
                    likeNumber = VenueDB.getLikabilityNumber(venueID);
                }
            }
        }
        else if (action.equalsIgnoreCase("get likability status")){
            if (VenueDB.venueExists(venueID)) {
                likeNumber = VenueDB.getLikabilityNumber(venueID);
            }
        }
        
        String jsonLikability = new Gson().toJson(likeNumber);
        
        response.setContentType("text/html;charset=UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonLikability);
        
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
