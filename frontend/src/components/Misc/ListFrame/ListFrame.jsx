import {
    ActionIcon, Button,
    Card, Center,
    Checkbox, Divider,
    Group,
    LoadingOverlay, Modal,
    MultiSelect,
    rem,
    ScrollArea,
    Select,
    TextInput, Title
} from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from './ListFrame.module.css';
import PropTypes from "prop-types";
import {
    IconSearch,
    IconArrowsSort,
    IconFilter, IconPlus
} from "@tabler/icons-react";
import {useToggle} from "@mantine/hooks";


const ListFrame = ({ items,
                       injection,
                       Component,
                       NewForm,
                       withForm = false,

                       search = ['title'],

                       sort = search,
                       withSorter = false,

                       filter,

                       checkBoxLabel,
                       setChecker,

                       width,
                       height = '670px',
                   }) => {
    




    // MARK: Initialize
    const [ filtered, setFiltered ] = useState([]);
    const [ hasBeenFiltered, setHasBeenFiltered ] = useState(false)





    // MARK: Create New
    const [ createOpened, setCreateOpened ] = useState(false)





    // MARK: Searching and Sorting
    // Manage searching action, including the direction of its sorting
    const [ searching, setSearching ] = useState('');
    const [ selectedSort, setSelectedSort ] = useState('')
    const [ order, toggleOrder ] = useToggle(['inc', 'dec']);
    
    const onSearchChange = (event) => setSearching(event.currentTarget.value)

    const toSearch = Array.prototype.concat(search);
    const toSort = Array.prototype.concat(sort);

    const iconSearch = <IconSearch style={{width: rem(16), height: rem(16)}}/>;
    




    // MARK: Check Mark
    // Manage check mark
    const [ checked, setChecked ] = useState(false)

    const onCheckChange = (event) => setChecked(event.currentTarget.checked)





    // MARK: Categories Filter
    // Manage categories
    const [ selectedFilters, setSelectedFilters ] = useState([])
    const [ cleanCategories, setCleanCategories ] = useState()

    useEffect(() => {
        setCleanCategories(Object.keys(filter || []).map(group => {
            return {
                group: group,
                items: filter[group]
            }
        }))
    }, [])
    




    // MARK: Filter
    // Manage the flow of how data is filtered
    useEffect(() => {

        setHasBeenFiltered(false)

        const searcher = (itemsToSearch) => {
            if (itemsToSearch?.length > 0) {
                return itemsToSearch.filter(item => {
                    const tempo = toSearch.map(info => {
                        return item[info]?.toLowerCase().includes(searching.toLowerCase());
                    })
                    return tempo.includes(true);
                });
            } else {
                return itemsToSearch;
            }
        }

        const checker = (itemsToCheck) => {
            if (setChecker && itemsToCheck?.length > 0) {
                return itemsToCheck.filter(item => {
                    return setChecker(item, checked)
                })
            } else {
                return itemsToCheck
            }
        }

        const reorder = (item1, item2) => {
            if (order === 'dec') {
                return [ item2, item1 ]
            } else {
                return [ item1, item2 ]
            }
        }

        const sorter = (itemsToSort) => {
            if (sort && itemsToSort?.length > 0) {
                const dataKey = selectedSort ? selectedSort : toSort[0]
                const dataType = dataKey.includes('date') ? 'date' : (typeof(itemsToSort[0][dataKey] || 'string'));
                return  itemsToSort.sort((item1, item2) => {
                    const [ itemFrom, itemTo ] = reorder(item1, item2)
                    if (dataType === 'date') {
                        return Date.parse(itemFrom.date)  - Date.parse(itemTo.date)
                    } else if (dataType === 'string') {
                        return itemFrom[dataKey].localeCompare(itemTo[dataKey])
                    } else if (dataType === 'number') {
                        return itemFrom[dataKey] - itemTo[dataKey]
                    } else {
                        return -1
                    }
                })
            } else {
                return itemsToSort
            }
        }

        const chooser = (itemsToChoose) => {
            if (filter && selectedFilters?.length > 0) {
                return itemsToChoose.filter(item => {
                    return Object.keys(filter).map(category => {
                        const arrayed = Array.prototype.concat(item[category]);
                        return selectedFilters.some(sel => arrayed.includes(sel));
                    })
                        .includes(true)
                })
            } else {
                return itemsToChoose
            }
        }

        const afterSorted = sorter(chooser(checker(searcher(items))));
        setFiltered(afterSorted);
        setHasBeenFiltered(true);
    }, [searching, items, order, checked, selectedFilters, selectedSort]);




    // MARK: ListFrame Header
    // React components detailing the header of the frame list
    const listFrameHeader = (
        <Card p='sm'>

            <Group justify='flex-end'>
                <TextInput
                    size='xs'
                    leftSectionPointerEvents='none'
                    leftSection={iconSearch}
                    value={searching}
                    onChange={onSearchChange}
                />
                <Group className={classes.nonSearch}>
                    {withSorter && (<>
                        <Select
                            size='xs'
                            checkIconPosition='right'
                            data={toSort}
                            value={selectedSort}
                            onChange={setSelectedSort}
                        />
                        {selectedSort !== '' &&
                            <ActionIcon
                                variant='default'
                                value={order}
                                onClick={toggleOrder}
                            >
                                <IconArrowsSort style={{width: rem(16), height: rem(16)}}/>
                            </ActionIcon>
                        }
                    </>)}

                    {filter && (<>
                        <MultiSelect
                            clearable
                            checkIconPosition='right'
                            size='xs'
                            w='150px'
                            leftSection={<IconFilter style={{width: rem(16), height: rem(16)}}/>}
                            value={selectedFilters}
                            onChange={setSelectedFilters}
                            data={cleanCategories}
                        />
                    </>)}

                    {setChecker && checkBoxLabel && (
                        <Checkbox
                            labelPosition='left'
                            label={checkBoxLabel}
                            checked={checked}
                            onChange={onCheckChange}
                        />
                    )}
                </Group>
            </Group>

            {withForm && (<>
                <Divider m='xs'/>
                <Button
                    variant='default'
                    w='100%'
                    onClick={() => setCreateOpened(true)}
                    h={50}
                >
                    <IconPlus/>
                </Button>
            </>)}
        </Card>
    )





    // MARK: Return components
    return (
        <Card w={width} h={height} className={classes.layout} m='auto' radius='sm' p={0}>
            {withForm && (
                <Modal opened={createOpened} onClose={() => setCreateOpened(false)} size='800px' zIndex={275}>
                    <NewForm close={() => setCreateOpened(false)}/>
                </Modal>
            )}

            {listFrameHeader}
            <Divider/>

            <Card h='100%' p={0}>
                { (hasBeenFiltered) ? (

                    (filtered?.length > 0) ? (
                        <ScrollArea scrollbars='y' type='always' h='100%' p='xs' scrollbarSize={4}>
                            {filtered?.map(item => <Component
                                key={item.id || item[toSearch[0]]}
                                item={item}
                                injection={injection}
                            />)}
                        </ScrollArea>
                    ) : (
                        <Center h='100%'>
                            <Title order={2}>No Result Found</Title>
                        </Center>
                    )

                ) : <LoadingOverlay visible={true} />
                }

            </Card>
        </Card>
    )
}





// MARK: Proptypes
// List property types inserted into ListFrame
ListFrame.propTypes = {
    items: PropTypes.array,
    injection: PropTypes.object,
    Component: PropTypes.elementType.isRequired,
    NewForm: PropTypes.func,
    withForm: PropTypes.bool,

    search: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    sort: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    sortType: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    withSorter: PropTypes.bool,

    filter: PropTypes.object,

    checkBoxLabel: PropTypes.string,
    setChecker: PropTypes.func,

    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}

export default ListFrame;