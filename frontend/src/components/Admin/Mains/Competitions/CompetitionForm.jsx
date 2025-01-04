import {
    Title,
    Divider,
    TextInput,
    Button,
    Group,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {useContext, useEffect, useState} from 'react'
import '@mantine/dates/styles.css'
import PropTypes from "prop-types";
import UserContext from "../../../../context/UserContext.js";
import {createCompetition, updateCompetition} from "../../../../services/competition.services.js";
import { v4 as uuidv4 } from 'uuid';

const CompetitionForm = ({competition, close, injection: data}) => {

    const { jwtToken } = useContext(UserContext);
    const [ changesPresent, setChangesPresent ] = useState(false);

    const handleTitleChange = (event) => form.setFieldValue('title', event.currentTarget.value);





    const form = useForm({
        initialValues: {
            title: competition?.title,
        },
        validate: {
            title: (value) => {
                if (!value.length > 0) {
                    return 'Name is required'
                }
            }
        },
    });





    const getNewCompetition = () => {
        return {
            id: competition?.id,
            title: form.values.title,
        }
    }

    const getOldCompetition = () => {
        return {
            id: competition?.id,
            title: competition?.title,
        }
    }

    const clearFields = () => {
        form.setFieldValue('title', competition?.title);
    }





    useEffect(() => {
        const newCompete = getNewCompetition()
        const oldCompete = getOldCompetition()
        setChangesPresent(JSON.stringify(newCompete) !== JSON.stringify(oldCompete))
    }, [competition, form]);





    const handleCreate = () => {
        const newCompete = {...getNewCompetition(), id: uuidv4()};
        createCompetition(newCompete, jwtToken)
            .then(() => {
                data.setCompetitions(data.competitions.concat(newCompete))
                clearFields()
            })
            .catch(e => console.log(e));
    }

    const handleUpdate = () => {
        const newCompete = getNewCompetition();
        updateCompetition(newCompete, jwtToken)
            .then(() => {
                clearFields();
                data.setCompetitions(data.competitions.map(eachCompete => {
                    if (eachCompete.id === competition.id) {
                        return newCompete
                    } else {
                        return eachCompete
                    }
                }));
                close();
            })
            .catch(e => console.log(e))
    }





    return (
        <>
            {(competition) ? (
                <Title order={3}>Update Competition</Title>
            ) : (
                <Title order={2}>Create New Competition</Title>
            )}
            <Divider m='md'/>





            <form onSubmit={form.onSubmit(() => handleCreate())}>
                <TextInput
                    label='Title'
                    placeholder='Enter title'
                    value={form.values.title || ''}
                    onChange={handleTitleChange}
                    error={form.errors.title}
                />
                <Divider m='lg' variant='dashed'/>







                {(!competition ? (
                    <Button mt='sm' w='100%' type='submit'>
                        Create Competition
                    </Button>
                ) : (
                    <Group justify='center' mt='xl' gap='xl' grow>
                        <Button disabled={!changesPresent} onClick={() => {
                            handleUpdate();
                            close();
                        }}>
                            Save
                        </Button>

                        <Button onClick={() => {
                            clearFields();
                            close();
                        }}>
                            Cancel
                        </Button>
                    </Group>
                ))}
            </form>
        </>
    );
}





CompetitionForm.propTypes = {
    competition: PropTypes.object,
    close: PropTypes.func,
    injection: PropTypes.object,
}

export default CompetitionForm