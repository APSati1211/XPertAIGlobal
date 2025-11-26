import axios from "axios";

// Yahan humne tumhare Backend ka naya IP daal diya hai
// Agar REACT_APP_API_URL set nahi bhi hai, to ye fallback IP kaam karega
const BASE_URL = process.env.REACT_APP_API_URL || "http://13.233.91.34:8000/api/";

const API = axios.create({
    baseURL: BASE_URL, 
    withCredentials: true, // Chatbot/Session ke liye zaroori hai
});

// Dynamic content
export const getPageContent = (page) => {
    if (page === "home") {
        return API.get("home-page-content/");
    }
    return API.get(`sitecontent/?page=${page}`);
};

export const getBlogs = (categorySlug = '') => {
    let url = "blogs/";
    if (categorySlug) {
        url += `?category=${categorySlug}`; // Add filter parameter
    }
    return API.get(url);
};

// Function to fetch all categories
export const getCategories = () => API.get("blog-categories/");

// Leads
export const submitLead = (data) => API.post("leads/", data);

// Contact form
export const sendContact = (data) => API.post("contact/", data);

// Careers
export const getJobs = () => API.get("jobs/");
export const applyForJob = (data) => API.post("apply/", data);

// Resources & Case Studies
export const getCaseStudies = () => API.get("case-studies/");
export const getResources = () => API.get("resources/");

// --- Services ---
export const getServices = () => API.get("services/");
export const getServiceBySlug = (slug) => API.get(`services/${slug}/`);

// --- Theme Settings ---
export const getThemeSettings = () => API.get("theme-settings/"); 

// --- Chatbot Handler ---
export const chatFlowHandler = (data) => API.post("chatbot-flow/", data);
