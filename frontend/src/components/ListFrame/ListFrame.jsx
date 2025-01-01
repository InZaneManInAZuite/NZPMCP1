import {
    ActionIcon,
    Card,
    Checkbox,
    Group,
    LoadingOverlay,
    MultiSelect,
    rem,
    ScrollArea,
    Select,
    TextInput
} from '@mantine/core';
import {useContext, useEffect, useState} from 'react';
import classes from './ListFrame.module.css';
import UserContext from "../../context/UserContext";
import PropTypes from "prop-types";
import {
    IconSearch,
    IconArrowsSort,
    IconFilter
} from "@tabler/icons-react";
import {useToggle} from "@mantine/hooks";


const ListFrame = ({ getAllFunc,
                       Component,
                       search = ['title'],
                       sort = search,
                       withSorter = false,
                       filter,
                       checkBoxLabel,
                       setChecker}) => {
    




    // MARK: Initialize
    // Start obtaining data from api and set up filtered list
    const [ items, setItems ] = useState([]);
    const { jwtToken } = useContext(UserContext);
    const [ filtered, setFiltered ] = useState([]);
    const [ hasBeenFiltered, setHasBeenFiltered ] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const allItems = await getAllFunc(jwtToken)
            setItems(allItems)
        }
        fetchData()
    }, [getAllFunc, jwtToken])





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

        const searcher = (itemsToSearch) => {
            return itemsToSearch.filter(item => {
                const tempo = toSearch.map(info => {
                    return item[info]?.toLowerCase().includes(searching.toLowerCase());
                })
                return tempo.includes(true)
            });

        }

        const checker = (itemsToCheck) => {
            if (!checked) {
                return itemsToCheck.filter(item => {
                    return setChecker(item)
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
            return  itemsToSort.sort((item1, item2) => {
                const [ itemFrom, itemTo ] = reorder(item1, item2)
                return itemFrom[selectedSort || toSort[0]].localeCompare(itemTo[selectedSort || toSort[0]])
            })
        }

        const chooser = (itemsToChoose) => {
            if (selectedFilters === null || selectedFilters.length === 0) {
                return itemsToChoose
            } else {
                return itemsToChoose.filter(item => {
                    return Object.keys(filter).map(category =>
                        selectedFilters.includes(item[category]))
                        .includes(true)
                })
            }
        }

        setFiltered(sorter(chooser(checker(searcher(items)))));

        if (items.length > 0) {
            setHasBeenFiltered(true)
        }
    }, [searching, items, order, checked, selectedFilters, selectedSort]);




    // MARK: ListFrame Header
    // React components detailing the header of the frame list
    const listFrameHeader = (
        <Card.Section withBorder p='sm'>
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
                            w='200px'
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
        </Card.Section>
    )





    // MARK: Return components
    return (
        <Card className={classes.layout} radius='md'>

            {listFrameHeader}

            <Card.Section withBorder h='100%'>
                { (hasBeenFiltered ? (
                    <ScrollArea scrollbars='y' type='always' h='600px'>
                        <Card>
                            {filtered.map(item => <Component key={item[toSearch[0]]} item={item} />)}
                        </Card>
                    </ScrollArea>
                ) : <LoadingOverlay visible={true} />
                )}

            </Card.Section>
        </Card>
    )
}





// MARK: Proptypes
// List property types inserted into ListFrame
ListFrame.propTypes = {
    getAllFunc: PropTypes.func.isRequired,
    Component: PropTypes.elementType.isRequired,

    search: PropTypes.oneOfType([
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
}

export default ListFrame;