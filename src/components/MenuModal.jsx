import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import useInput from '../hooks/useInput'
import DeleteIcon from '@mui/icons-material/Delete'
import {useSelector} from 'react-redux'
import {
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} from '../store/productsApi'
import {toast} from 'react-toastify'

function MenuModal({restaurant, updatedItem, close}) {
    const {createModal, updateModal, selectedCategory} = useSelector(
        (state) => state.modals
    )
    const [addProduct] = useAddProductMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()
    const {data, handleChange, formData} = useInput(
        restaurant,
        selectedCategory,
        updatedItem
    )

    const handleSubmitCategory = async () => {
        await addProduct(formData).unwrap()
        close()
        toast.success('Позиция добавлена')
    }
    const handleUpdateMenu = async () => {
        await updateProduct({
            body: formData,
            updatedItem: updatedItem.id,
        }).unwrap()
        close()
        toast.success('Позиция изменена')
    }

    const handledelete = async () => {
        await deleteProduct({id: updatedItem.id})
        close()
        toast.error('Позиция удалена')
    }

    return (
        <>
            <Modal show={createModal ? createModal : updateModal} onHide={close}>
                <Modal.Header closeButton>
                    {createModal ? (
                        <Modal.Title>Добавить меню</Modal.Title>
                    ) : (
                        <div>
                            <Modal.Title>Изменить меню</Modal.Title>
                        </div>
                    )}
                    {updateModal && (
                        <DeleteIcon
                            style={{cursor: 'pointer'}}
                            color="error"
                            onClick={() => handledelete()}
                        />
                    )}
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Изображение</Form.Label>
                            <Form.Control
                                type="file"
                                name="photo"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={close}>
                        Закрыть
                    </Button>
                    <Button
                        variant="success"
                        onClick={createModal ? handleSubmitCategory : handleUpdateMenu}
                    >
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MenuModal
