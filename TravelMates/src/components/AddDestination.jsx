import { useState } from "react";
import { Button, Card, Container, Form, ToastContainer } from "react-bootstrap";
import { AddDesitnation } from "../services/DestinationService";
import { Bounce, toast } from "react-toastify";

export function AddDestination() {
    const [formData, setFormData] = useState({
    destination_name: "",
    description: "",
    Price: "",
    Imgpath: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        console.log(formData);
        const response = await AddDesitnation(formData);
        console.log(response);
        if (response.status === 200) {
                // show success message
                toast.success("Destination Added", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }

    } catch (error) {
        console.log(error);
        if (error.response.status === 500) {
                // show failure message
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        
    }

  }
//     try {
     
//     } catch (error) {
     
//   };
    return (
    <Container className="py-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow border-0 rounded-4">
        <Card.Body>
          <h3 className="text-center mb-4 text-secondary fw-bold">
            Add New Destination
          </h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Destination Name</Form.Label>
              <Form.Control
                type="text"
                name="destination_name"
                placeholder="Enter destination name"
                value={formData.destination_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="Price"
                placeholder="Enter Price"
                value={formData.Price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="Imgpath"
                placeholder="Enter image URL"
                value={formData.Imgpath}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter country name"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="secondary" type="submit" className="px-4 rounded-pill btn btn-dark">
                Add Destination
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );   
}
