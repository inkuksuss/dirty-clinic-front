<script lang="ts">
import { defineComponent, ref } from 'vue';

type ManageInfo = {
    title: string;
    content: Array<{ main: string; sub?: string }>;
    icon: string;
    isOpen: boolean;
};

export default defineComponent({
    name: 'SubManage',
    setup() {
        const manageList = ref<ManageInfo[]>([
            {
                title: '거실',
                content: [
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' }
                ],
                icon: 'src/assets/images/icons/living_room.svg',
                isOpen: false
            },
            {
                title: '화장실, 욕실',
                content: [
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' }
                ],
                icon: 'src/assets/images/icons/bath_room.svg',
                isOpen: false
            },
            {
                title: '주방',
                content: [
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' }
                ],
                icon: 'src/assets/images/icons/kitchen.svg',
                isOpen: false
            },
            {
                title: '베란다, 다용도실',
                content: [
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' }
                ],
                icon: 'src/assets/images/icons/veranda.svg',
                isOpen: false
            },
            {
                title: '방',
                content: [
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' }
                ],
                icon: 'src/assets/images/icons/room.svg',
                isOpen: false
            },
            {
                title: '현관',
                content: [
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' },
                    { main: '베란다 창문 청소' },
                    { main: '베란다 창문 청소', sub: '2, 4 외부 창문 제외' }
                ],
                icon: 'src/assets/images/icons/entrance.svg',
                isOpen: false
            }
        ]);

        const handleClick = (info: ManageInfo) => {
            const open = manageList.value.find((m) => m.isOpen);
            openClear();
            if (!open || open.title !== info.title) {
                info.isOpen = true;
            }
        };

        const openClear = () => {
            manageList.value.forEach((m) => (m.isOpen = false));
        };

        return {
            manageList,
            handleClick
        };
    }
});
</script>

<template>
    <div class="manage-wrapper bg-[--color-skyblue] w-full pt-[85px] pb-[85px] flex justify-center">
        <div class="manage-contents max-w-[--body-width] w-[73%] flex flex-col">
            <div class="text-area mb-[30px]">
                <div
                    class="text-[--color-text-black] text-[32px] font-[700] leading-[38px] mb-[10px]"
                >
                    어디까지 관리 되나요?
                </div>
                <div class="text-[--color-text-black] text-[18px] font-[500] leading-[26px]">
                    청결을 모토로 오염요소는 완벽하게 제거해드립니다. <br />
                    알고싶은 영역을 눌러보세요.
                </div>
            </div>
            <div class="list-area grid grid-rows-3 grid-cols-2 gap-[20px]">
                <div
                    v-for="(info, idx) in manageList"
                    :key="idx"
                    class="content-wrapper relative max-w-[430px] h-[80px] border-[1.5px] border-[#96C8F6] border-solid bg-[--color-white] px-[30px] flex justify-between items-center"
                    :class="{ active: info.isOpen }"
                    @click="() => handleClick(info)"
                >
                    <div class="body flex items-center">
                        <img class="mr-[20px]" :src="info.icon" />
                        <span
                            class="text-[--color-text-black] text-[24px] font-[600] leading-[26px]"
                            >{{ info.title }}</span
                        >
                    </div>
                    <img class="arrow" src="@/assets/images/icons/arrow_down.svg" alt="arrow" />

                    <transition name="slide-fade" mode="out-in">
                        <div
                            v-if="info.isOpen"
                            class="info-label absolute max-w-[430px] w-full top-[77px] left-[-1.5px] border-[1.5px] border-[#96C8F6] border-solid bg-[--color-white] z-10"
                        >
                            <div
                                v-for="(content, idx) in info.content"
                                :key="new Date().getTime() + '_' + idx"
                                class="info-box flex py-[15px] px-[30px]"
                            >
                                <img class="mr-[10px]" src="@/assets/images/icons/check.svg" />
                                <span class="mr-[10px]">{{ content.main }}</span>
                                <span v-if="content.sub">{{ content.sub }}</span>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
