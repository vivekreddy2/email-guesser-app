import { render, cleanup } from "@testing-library/react";
import {AxiosStatic} from "axios";

const axiosMock = jest.mock<AxiosStatic>('axios')


describe('fetchData', () => {


    afterEach(cleanup);
    it('fetches successfully data from an API', async () => {
 
      // const data = {emailAddress: 'jdoe@babbel.com'};
  
      // axiosMock.get.mockImplementationOnce(() => Promise.resolve(data));
  
      // await expect(fetchData('react')).resolves.toEqual(data);
  
      // expect(axios.get).toHaveBeenCalledWith(
      //   `${API}/search?query=react`,
      // );
    });
  
  });