import { EventParticipant } from '@/api';
import { useEventParticipantsByEvent } from '@/hooks/useEventQueries';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../../constants';

interface Participant {
    id: string;
    fullname: string;
    avatar: string;
    email: string;
}

const ParticipantsScreen = () => {
    const { t } = useTranslation();
    const { id } = useLocalSearchParams();
    const { data: participants } = useEventParticipantsByEvent(id as string);
    const participantList = participants?.map((p: EventParticipant) => p.participant);

    const renderItem = ({ item: participant }: { item: Participant }) => (
        <View style={styles.participantCard}>
            <Image
                style={styles.avatar}
                source={{ uri: participant.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
            />
            <View style={styles.participantInfo}>
                <Text style={styles.fullname}>{participant.fullname || participant.email || 'Unknown User'}</Text>
                {!!participant.email && (
                    <Text style={styles.email} numberOfLines={1}>{participant.email}</Text>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()} activeOpacity={0.7}>
                    <Ionicons name="arrow-back" size={16} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {t('eventDetail.participants', { count: participants?.length || 0 })}
                </Text>
                <View style={styles.headerBtn} />
            </View>
            <FlatList
                data={participantList}
                keyExtractor={(item, index) => item?.id || index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default ParticipantsScreen

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F6F8F7' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(246,248,247,0.8)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(32,105,58,0.1)',
        zIndex: 10,
    },
    headerBtn: { width: 40, height: 40, borderRadius: 9999, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontFamily: Fonts.bold, fontSize: 18, lineHeight: 28, color: '#0F172A', flex: 1, textAlign: 'center' },
    listContainer: {
        padding: 16,
        gap: 10,
    },
    participantCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2.5,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 14,
    },
    participantInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    fullname: {
        fontFamily: Fonts.semiBold,
        fontSize: 16,
        color: '#0F172A',
        marginBottom: 4,
    },
    email: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: '#64748B',
    },
})