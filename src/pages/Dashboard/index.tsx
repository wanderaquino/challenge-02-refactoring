import {useState } from 'react';
import {Header} from '../../components/Header';
import api from '../../services/api';
import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useEffect } from 'react';
import { Food } from '../../components/Food';

interface FoodProps {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
  available: boolean
}

export function Dashboard () {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodProps>();

  useEffect(() =>{    
    async function loadFoods () {
    return await api.get("/foods");
  }
    loadFoods().then( response => {
      setFoods(response.data);
    }
    )
  }, [])

 const handleAddFood = async (food: FoodProps) => {
    const localFoods = foods;
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      setFoods([...localFoods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

 const handleUpdateFood = async (food:FoodProps) => {
    const updateFood = editingFood;
    
    if(updateFood){
    try {
      const foodUpdated = await api.put(
        `/foods/${updateFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods([...foodsUpdated]);
    } catch (err) {
      console.log(err);
    }
  }
}

  const handleDeleteFood = async (id: number) => {

  }

  const toggleModal = () => {
    
  }

  const toggleEditModal = () => {

  }

  const handleEditFood = (food: FoodProps) => {
    // this.setState({ editingFood: food, editModalOpen: true });
  }


    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods && foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );    
  }