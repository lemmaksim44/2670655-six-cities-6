import MainPage from '../../page/main-page/main-page';

type AppProps = {
  cardQuantity: number;
}

function App({cardQuantity}: AppProps) {
  return (
    <MainPage cardQuantity={cardQuantity}/>
  );
}

export default App;
