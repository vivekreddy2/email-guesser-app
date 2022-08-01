import React, { useState } from 'react';
import { Input } from '@awsui/components-react'
 import {   AppLayout,
    Form,
    FormField,
    Header,
    SpaceBetween,
    Container,
    Button,
} from '@awsui/components-react';
import { getEmailAddress } from '../API';



const EmailGuesser = (): JSX.Element => {
    const [fullName, setFullName] = useState<string>('');
    const [domain, setDomain] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [emailAddressMessage, setEmailAddressMessage] = useState<JSX.Element | null>(null);



    const getFormContainer = (): JSX.Element => (
        <Container>
            <SpaceBetween direction="vertical" size="l">
                <FormField
                    data-testid='fullNameLabel'
                    label="Full Name"
                    description="Enter full name with format 'FirstName LastName' for eg. Jane Doe"
                    
                >
                    <Input
                        data-testid='fullNameInput'
                        value={fullName}
                        placeholder='Jane Doe'
                        onChange={(event) => setFullName(event.detail.value)}
                    />
                </FormField>
                <FormField
                    data-testid='domainLabel'
                    label="Domain"
                    description="Enter domain name of the company for eg. babbel.com"
                >
                    <Input
                        data-testid='domainInput'
                        value={domain}
                        placeholder='babbel.com'
                        onChange={(event) => setDomain(event.detail.value)}
                    />
                </FormField>

            </SpaceBetween>

        </Container>
    )


    const onSubmitHandler = async (): Promise<void> => {
        setIsLoading(true);
        const emailAddress: string = await getEmailAddress(fullName, domain);
        console.log('emailAddress ', emailAddress);
        setEmailAddressMessage(<p> Email Address for user <strong>{fullName}</strong> with domain <strong>{domain}</strong> is <a href={emailAddress}>{emailAddress}</a> </p>);

        setIsLoading(false);
    }

    const showEmailAddressMessage = (): JSX.Element => (
        <Container data-testid='showEmailAddressContainer'>
            {emailAddressMessage}
        </Container>);

    return (

        <AppLayout
            contentType='form'
            maxContentWidth={600}
            navigationHide={true}
            toolsHide={true}
            data-testid='app_layout'
            content={
                <SpaceBetween size='xxl' direction='vertical'>
                    <Form
                        actions={
                            <Button data-testid='submitButton' variant="primary" loading={isLoading} onClick={() => onSubmitHandler()}>Submit</Button>
                        }
                        header={
                            <Header variant="h1">
                                Babbel Email Guesser
                            </Header>
                        }
                    >
                        {getFormContainer()}
                    </Form>

                    {/* Show Email Address Message only when available */}
                    {emailAddressMessage !== null && !isLoading ? showEmailAddressMessage() : null}

                </SpaceBetween>
            }
        />

    );
}


export default EmailGuesser;