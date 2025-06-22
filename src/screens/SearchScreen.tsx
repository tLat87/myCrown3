import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image, ImageBackground,
} from 'react-native';
import {searchHeroesByName} from "../api/superheroApi.ts";
import FilterSvg from "../assets/svg/FilterSvg.tsx";
import Colors from "../constants/colors";
import HeroCard from "../component/HeroCard.tsx";
import HeroCardSkeleton from "../component/HeroCardSkeleton.tsx";
import FilterModal from "../component/FilterModal.tsx";

const LIMIT = 10;

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState({
        stats: [],
        alignment: [],
    });

    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollRef = useRef<ScrollView>(null);

    const applyFilterLogic = (heroes) => {
        return heroes.filter(hero => {
            const statsOk =
                filters.stats.length === 0 ||
                filters.stats.every(stat => Number(hero.powerstats?.[stat]) > 60);

            const alignOk =
                filters.alignment.length === 0 ||
                filters.alignment.includes(hero.biography?.alignment);

            return statsOk && alignOk;
        });
    };

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setOffset(0);
            return;
        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(async () => {
            setLoading(true);
            const rawResults = await searchHeroesByName(query, 0, LIMIT * 3);
            const filtered = applyFilterLogic(rawResults);
            setResults(filtered.slice(0, LIMIT));
            setOffset(LIMIT);
            setHasMore(filtered.length > LIMIT);
            setLoading(false);
        }, 500);

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [query, filters]);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const moreRaw = await searchHeroesByName(query, offset, LIMIT * 3);
        const moreFiltered = applyFilterLogic(moreRaw);
        setResults(prev => [...prev, ...moreFiltered.slice(0, LIMIT)]);
        setOffset(prev => prev + LIMIT);
        setHasMore(moreFiltered.length > LIMIT);
        setLoading(false);
    }, [loading, hasMore, query, offset, filters]);

    const handleScroll = useCallback((e) => {
        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
        const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isBottom) loadMore();
        setShowScrollTop(contentOffset.y > 300);
    }, [loadMore]);

    const scrollToTop = useCallback(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, []);

    const toggleFilter = (type, value) => {
        setFilters(prev => {
            const updated = { ...prev };
            const list = updated[type];
            if (list.includes(value)) {
                updated[type] = list.filter(item => item !== value);
            } else {
                updated[type] = [...list, value];
            }
            return updated;
        });
    };

    const applyFilters = () => {
        setFilterModalVisible(false);
    };

    const renderEmptyState = () => {
        const message = query.trim() === ''
            ? 'this city needs a hero...'
            : 'No hero found :(';

        return (
            <View style={{ position: 'relative', height: 500 }}>
                {query.trim() === '' && (
                    <Text style={[styles.location, { marginTop: 250, color: '#fff', textAlign: 'center' }]}>
                        Start typing to your search
                    </Text>
                )}
                <Text style={[styles.location, { marginTop: 250, color: '#000', textAlign: 'center' }]}>
                    {message}
                </Text>
            </View>
        );
    };

    return (
        <ImageBackground source={require('../assets/img/HD-wallpaper-black-crown-journal-cool-for-witchy-black-dark-crown.jpg')} style={styles.container}>

        <ScrollView
                ref={scrollRef}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >


                <View style={styles.header}>
                    {/*<Text style={styles.location}>Which crown suits</Text>*/}
                    <Text style={[styles.location, styles.subtitle]}>Find hero</Text>
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search heroes..."
                        placeholderTextColor="#999"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={{ marginTop: 10 }}>
                        <FilterSvg width={24} height={24} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                {results.length === 0 && !loading ? (
                    renderEmptyState()
                ) : (
                    <>
                        {results.map(hero => (
                            <HeroCard key={hero.id} data={hero} />
                        ))}

                        {loading && (
                            <>
                                <HeroCardSkeleton />
                                <HeroCardSkeleton />
                            </>
                        )}
                    </>
                )}

            </ScrollView>

            {showScrollTop && (
                <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
                    <Text style={styles.scrollTopText}>↑</Text>
                </TouchableOpacity>
            )}

            <FilterModal
                visible={filterModalVisible}
                filters={filters}
                onClose={() => setFilterModalVisible(false)}
                onApply={applyFilters}
                onToggle={toggleFilter}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.background,
        flex: 1,
    },
    header: {
        backgroundColor: '#1F2021',
        justifyContent: 'center',
        alignItems: 'center',
        height: 260,
    },
    location: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '900',
        textAlign: 'center',
    },
    subtitle: {
        color: Colors.textDark,
        backgroundColor: Colors.background,
        padding: 8,
        borderRadius: 16,
        marginTop: 12,
    },
    inputWrapper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: -30,
        elevation: 4,
    },
    input: {
        fontSize: 16,
        color: '#333',
    },
    scrollTopButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: Colors.primary,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    scrollTopText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SearchScreen;
