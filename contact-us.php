<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json"); // Set response type to JSON

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Function to send a JSON response
function sendResponse($status, $message) {
    echo json_encode(["status" => $status, "message" => $message]);
    exit();
}

// Read raw JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true); // Decode JSON to an associative array

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data from JSON body
    $name = htmlspecialchars($data['name'] ?? '');
    $email = htmlspecialchars($data['email'] ?? '');
    $phone = htmlspecialchars($data['phone'] ?? '');
    $howDidYouFindUs = htmlspecialchars($data['howDidYouFindUs'] ?? '');
    $message = htmlspecialchars($data['message'] ?? '');

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        sendResponse("error", "Name, email, and message are required.");
    }

    // Set email details
    $to = "k31.sangram@gmail.com"; // Replace with your email address
    $subject = "New Contact Us Form Submission";
    $body = "You have received a new message from your website Contact Us form.\n\n".
            "Here are the details:\n".
            "Name: $name\n".
            "Email: $email\n".
            "Phone: $phone\n".
            "How Did You Find Us: $howDidYouFindUs\n\n".
            "Message:\n$message";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        sendResponse("success", "Thank you for contacting us, $name. We will get back to you shortly.");
    } else {
        sendResponse("error", "There was an error sending your message. Please try again later.");
    }
}
?>
