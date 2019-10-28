import React, { useState, useEffect } from 'react';
import Card from './containers/Card';
import styled from 'styled-components';
// import Img from '../img/orca.png';

interface Props {}

const App: React.FC<Props> = () => {
  // console.log(Img);
  // const cards = [Img, Img, Img];
  const [cards, setCards] = useState<User[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setError(false);
      setLoading(true);
      try {
        const QiitaUsers = await fetch('https://qiita.com/api/v2/users', {
          method: 'GET',
        });
        const resUsers: ResponseUser[] = await QiitaUsers.json();
        const users = resUsers.map<User>(({ id, profile_image_url, url }) => {
          return { id, profileImageUrl: profile_image_url, url };
        });
        setCards(users);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  return (
    <>
      <Card cards={cards}></Card>
      {error && (
        <ErrorTitle style={{ color: `red` }}>
          <p>some error occurred, while fetching api</p>
        </ErrorTitle>
      )}
      {loading && (
        <LoadingTitle style={{ color: `green` }}>
          <p>
            fetching books for "<strong>User</strong>"
          </p>
        </LoadingTitle>
      )}
    </>
  );
};

export default App;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
`;
const ErrorTitle = styled(Title)`
  color: #c33;
`;

const LoadingTitle = styled(Title)`
  color: #3b7;
`;
