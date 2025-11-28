// src/api/index.js

import axios from "axios";

const API = axios.create({
    baseURL: "http://3.108.252.40:8000/api/", 
});

// Dynamic content fetch karne ke liye
export const getPageContent = (page) => {
    if (page === "home") {
        return API.get("home-page-content/");
    }
    return API.get(`sitecontent/?page=${page}`);
};

// Blogs fetch karne ke liye (category filter ke saath)
export const getBlogs = (categorySlug = '') => {
    let url = "blogs/";
    if (categorySlug) {
        url += `?category=${categorySlug}`; // Add filter parameter
    }
    return API.get(url);
};

// NEW: Function to fetch all categories
export const getCategories = () => API.get("blog-categories/");

// Leads submit karne ke liye
export const submitLead = (data) => API.post("leads/", data);

// Contact form
export const sendContact = (data) => API.post("contact/", data);

// Careers / Jobs fetch karne ke liye
export const getJobs = () => API.get("jobs/");

// Job Application submit karne ke liye
export const applyForJob = (data) => API.post("apply/", data);

// Resources aur Case Studies fetch karne ke liye
export const getCaseStudies = () => API.get("case-studies/");

// Resources fetch karne ke liye
export const getResources = () => API.get("resources/");

// Services fetch karne ke liye
export const getServices = () => API.get("services/");

// Specific Service Detail fetch karne ke liye
export const getServiceBySlug = (slug) => API.get(`services/${slug}/`);

// Theme Settings fetch karne ke liye
export const getThemeSettings = () => API.get("theme-settings/"); 

export const chatFlowHandler = (data) => API.post("chatbot-flow/", data);

export const getStakeholders = () => API.get("stakeholders/");

// --- Home Page ---
export const getHomeData = () => API.get("homepage-data/");

// --- Resources Page ---
export const getResourcesPageData = () => API.get("resources-page-data/");

// --- Lead System Page ---
export const getLeadSystemData = () => API.get("lead-system-data/");