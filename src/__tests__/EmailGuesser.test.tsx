import EmailGuesser from '../components/EmailGuesser';
import mockAxios from 'jest-mock-axios';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';

describe('EmailGuesser Component Tests', () => {
    jest.mock('axios');
    let container: HTMLDivElement;
    
    beforeEach(() => {
        
        
    });

    
    afterEach(() => {
        mockAxios.reset();
        cleanup();
    });

    it('Renders correctly on initial loading', () => {
        const { getByTestId, queryByTestId, getByLabelText } = render( <EmailGuesser/>);
        expect(getByTestId('app_layout')).toBeInTheDocument();

        expect(getByTestId('fullNameInput')).toHaveTextContent('');
        expect(getByTestId('fullNameLabel')).toHaveTextContent('Enter full name with format \'FirstName LastName\' for eg. Jane Doe');
        expect(getByLabelText('Full Name')).toBeInTheDocument();

        expect(getByTestId('domainInput')).toHaveTextContent('');
        expect(getByTestId('domainLabel')).toHaveTextContent('Enter domain name of the company for eg. babbel.com');
        expect(getByLabelText('Domain')).toBeInTheDocument();

        expect(getByTestId('submitButton')).toHaveTextContent('Submit');
        
        // showEmailAddressContainer should not be rendered on initial load
        expect(queryByTestId('showEmailAddressContainer')).not.toBeInTheDocument();
    });

    it('adfa', async () => {
        const { getByTestId, getByPlaceholderText } = render( <EmailGuesser/>);
        // mockAxios.mockResponseFor({url: '/get'}, {data: "test"});
        mockAxios.get.mockResolvedValueOnce({data: {emailAddress: 'jdoe@babbel.com'}});
        fireEvent.change(getByPlaceholderText('Jane Doe'), {target: {value: 'Jane Doe'}})
        fireEvent.change(getByPlaceholderText('babbel.com'), {target: {value: 'babbel.com'}})



        const submitButton = getByTestId('submitButton');
        fireEvent.click(submitButton);
        const showEmailAddressContainer = await waitFor(() => getByTestId('showEmailAddressContainer'));
        expect(showEmailAddressContainer).toHaveTextContent('Email Address for user Jane Doe with domain babbel.com is jdoe@babbel.com')
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith("http://localhost:8080/users/email-address", {headers: {"Access-Control-Allow-Origin": "*"}, params: {"domain": "babbel.com", "fullName": "Jane Doe"}})
        



    })





})