import Link from "next/link";
import Footer from "@/app/components/footer";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function Contact() {
  return (
    <>
      <div className="container my-5">
        <h1 className="text-center mb-4">Contact Us</h1>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h3>Get in Touch</h3>
            <p>
              We'd love to hear from you! Please fill out the form below, and we
              will get back to you as soon as possible.
            </p>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="name">Your Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Enter your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
          <div className="col-md-6 mb-4">
            <h3>Contact Information</h3>
            <p>You can also reach us at:</p>
            <ul className="list-unstyled">
              <li><strong>Email:</strong> 66309010008@cmtc.ac.th</li>
              <li><strong>Phone:</strong> +123 456 7890</li>
              <li><strong>Address:</strong> 123 Your Street, Your City, Your Country</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}