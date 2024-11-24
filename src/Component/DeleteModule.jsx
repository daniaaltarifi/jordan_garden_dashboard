
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteModule({ show, handleClose, handleDelete, id }) {
    const lang = location.pathname.split("/")[1] || "en";

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{lang === 'ar' ? "تأكيد الحذف" : "Delete Confirmation"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{lang === 'ar' ? "هل أنت متأكد من حذف هذا العنصر؟" : "Are you sure you want to delete this item?"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {lang === 'ar' ? "إغلاق" : "Close"}
          </Button>
          <Button variant="danger" onClick={() => { 
            handleDelete(id); 
            handleClose(); 
          }}>
            {lang === 'ar' ? "حذف" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default DeleteModule;

