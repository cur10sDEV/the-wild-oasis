import styled from "styled-components";

import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useAddCabin } from "./useAddCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, addCabin } = useAddCabin();

  const {
    id: cabinId,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;

  const handleDuplicate = () => {
    addCabin({
      name: `Copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    });
  };
  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits upto {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button disabled={isCreating || isDeleting} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit-form">
            <button disabled={isCreating || isDeleting}>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="delete-cabin">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isCreating || isDeleting}
              resourceName="Cabin"
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
};

export default CabinRow;
