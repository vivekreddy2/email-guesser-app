import axios from "axios";

const BASE_URL = "http://localhost:8080";
const GET_EMAIL_ADDRESS_API_PATH = '/users/email-address'


// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

type GetEmailAddressResponse = {
    emailAddress: string;
}

export const getEmailAddress = async (fullName: string, domain: string): Promise<string> => {

    console.log(fullName, domain);
    const response = await axios.get(BASE_URL + GET_EMAIL_ADDRESS_API_PATH, {
        params: {fullName, domain},
        headers: {'Access-Control-Allow-Origin': '*'}
    });

    const {emailAddress} = response.data as GetEmailAddressResponse;
    console.log(emailAddress);
    return emailAddress;
};

