import {useState } from 'react';
import {Header} from '../../components/Header';
import api from '../../services/api';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useEffect } from 'react';
import { Food } from '../../components/Food';

interface FoodProps {
  id: number,
  name: string,
  image: string,
  type: string,
  description: string,
  price: number,
  isAvailable: boolean
}

export function Dashboard () {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodProps>();

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }

  useEffect(() =>{    
    async function loadFoods () {
    return await api.get("/foods");
  }
    loadFoods().then( response => {
      setFoods(response.data);
    }
    )
  }, [])

  // async function componentDidMount() {
  //   const response = await api.get('/foods');

  //   this.setState({ foods: response.data });
  // }

 const handleAddFood = async (food: FoodProps) => {
  //   const { foods } = this.state;

  //   try {
  //     const response = await api.post('/foods', {
  //       ...food,
  //       available: true,
  //     });

  //     this.setState({ foods: [...foods, response.data] });
  //   } catch (err) {
  //     console.log(err);
  //   }
  }

 const handleUpdateFood = async (food:FoodProps) => {
  //   const { foods, editingFood } = this.state;

  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  }

  const handleDeleteFood = async (id: number) => {
  //   const { foods } = this.state;

  //   await api.delete(`/foods/${id}`);

  //   const foodsFiltered = foods.filter(food => food.id !== id);

  //   this.setState({ foods: foodsFiltered });
  }

  const toggleModal = () => {
    // const { modalOpen } = this.state;

    // this.setState({ modalOpen: !modalOpen });
  }

  const toggleEditModal = () => {
    // const { editModalOpen } = this.state;

    // this.setState({ editModalOpen: !editModalOpen });
  }

  const handleEditFood = (food: FoodProps) => {
    // this.setState({ editingFood: food, editModalOpen: true });
  }

  // render() {
  //   const { modalOpen, editModalOpen, editingFood, foods } = this.state;

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