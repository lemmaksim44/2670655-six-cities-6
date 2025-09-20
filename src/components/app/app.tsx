import MainPage from '../../page/main-page/main-page';

type AppProps = {
  cardQuantity: number;
}

function App({cardQuantity}: AppProps): JSX.Element {
  return (
    <MainPage cardQuantity={cardQuantity}/>
  );
}

export default App;
