import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import {Modal} from '../Modal';
import {Input} from '../Input';
import { FormHandles } from '@unform/core';

interface FoodInterface {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
  available: boolean
} 

interface ModalEditFoodProps {
  editingFood: FoodInterface | undefined,
  setIsOpen: () => void;
  handleUpdateFood: (data: FoodInterface) => void;
  isOpen: boolean;
}

export function ModalEditFood(props: ModalEditFoodProps) {
  
  const formRef = createRef<FormHandles>()

  const handleSubmit = async (data:FoodInterface) => {
    props.handleUpdateFood(data);
    props.setIsOpen();
  };

  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={props.editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}