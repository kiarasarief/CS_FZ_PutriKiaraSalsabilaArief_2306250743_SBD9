/**
 * API utility functions for handling responses and errors
 */

// Function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Unauthorized - clear user data and redirect to login
        localStorage.removeItem("currentUser");
        window.location.href = "/login";
        return {
          type: "AUTH_ERROR",
          message: data.message || "Session expired. Please log in again.",
        };

      case 403:
        // Forbidden
        return {
          type: "PERMISSION_ERROR",
          message:
            data.message ||
            "You do not have permission to access this resource.",
        };

      case 404:
        // Not Found
        return {
          type: "NOT_FOUND",
          message: data.message || "Resource not found.",
        };

      case 422:
        // Validation Error
        return {
          type: "VALIDATION_ERROR",
          message: data.message || "Validation failed.",
          errors: data.errors,
        };

      case 500:
        // Server Error
        return {
          type: "SERVER_ERROR",
          message: data.message || "Something went wrong on the server.",
        };

      default:
        // Other errors
        return {
          type: "REQUEST_ERROR",
          message: data.message || `Request failed with status code ${status}`,
        };
    }
  } else if (error.request) {
    // The request was made but no response was received
    return {
      type: "NETWORK_ERROR",
      message:
        "No response from server. Please check your internet connection.",
    };
  } else {
    // Something happened in setting up the request
    return {
      type: "CLIENT_ERROR",
      message:
        error.message || "An error occurred while setting up the request.",
    };
  }
};

// Format form data for file uploads
export const createFormData = (data, file, fileFieldName = "image") => {
  const formData = new FormData();

  // Add regular fields to FormData
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  // Add file if exists
  if (file) {
    formData.append(fileFieldName, file);
  }

  return formData;
};
