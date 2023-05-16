import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductsList/ProductCard";
import userEvent from "@testing-library/user-event";

const productMock = {
  id: "1",
  title: "Blusa de frio",
  price: 100,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};
const addToCartMock = jest.fn();
describe("Teste do ProductCard", () => {
  test("Renderizar o componente", () => {
    render(<ProductCard product={productMock} addToCart={addToCartMock} />);
  });
  test("Renderizar os dados", () => {
    render(<ProductCard product={productMock} addToCart={addToCartMock} />);
    screen.logTestingPlaygroundURL();
    const imagem = screen.getByRole("img", { name: /blusa de frio/i });
    const title = screen.getByRole("heading", { name: /blusa de frio/i });
    const price = screen.getByText(/\$100\.00/i);
    const buybutton = screen.getByRole("button", { name: /buy/i });

    expect(imagem).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(buybutton).toBeInTheDocument();
  });
  test("Quando o botao for clicado deve adicionar no carrinho", async () => {
    //criar 1 usuario ficticio
    const user = userEvent.setup();
    render(<ProductCard product={productMock} addToCart={addToCartMock} />);
    //achar o botap
    const buybutton = screen.getByRole("button", { name: /buy/i });

    await user.click(buybutton);

    expect(addToCartMock).toBeCalled;
    expect(addToCartMock).toBeCalledTimes(1);

    screen.logTestingPlaygroundURL();
  });
});
