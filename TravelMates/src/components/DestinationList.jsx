import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import { getAllDestination, DeleteDestination, UpdateDestination } from "../services/DestinationService.js";
import { toast } from "react-toastify";


export function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await getAllDestination();
      setDestinations(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteDestination(selectedDestination.dest_id);
      toast.success("Destination deleted successfully!");
      setShowDeleteModal(false);
      fetchDestinations();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete destination.");
    }
  };

  const handleEdit = (destination) => {
    setSelectedDestination(destination);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await UpdateDestination(selectedDestination.dest_id, selectedDestination);
      toast.success("Destination updated successfully!");
      setShowEditModal(false);
      fetchDestinations();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update destination.");
    }
  };

  const handleChange = (e) => {
    setSelectedDestination({
      ...selectedDestination,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className="py-5">
      <h3 className="text-center mb-4 text-primary fw-bold">All Destinations</h3>
      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Destination Name</th>
            <th>Description</th>
            <th>Starting Price</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((dest) => (
            <tr key={dest.dest_id}>
              <td>{dest.dest_id}</td>
              <td>{dest.destination_name}</td>
              <td>{dest.description}</td>
              <td>{dest.Price}</td>
              <td>{dest.Country}</td>
              <td style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <Button variant="warning" size="sm" onClick={() => handleEdit(dest)} className="me-2">
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedDestination(dest);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{selectedDestination?.destination_name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Destination</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Destination Name</Form.Label>
              <Form.Control
                type="text"
                name="destination_name"
                value={selectedDestination?.destination_name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={selectedDestination?.description || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="Price"
                value={selectedDestination?.Price || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="Imgpath"
                value={selectedDestination?.Imgpath || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
