<script>
import { defineComponent } from 'vue';
import { AutoPlay } from '@egjs/flicking-plugins';
import Flicking from '@egjs/vue3-flicking';

export default defineComponent({
    components: { Flicking: Flicking },
    setup() {
        const autoPlay = new AutoPlay({ duration: 1000, direction: 'NEXT', stopOnHover: true });
        autoPlay.play();
        const plugins = [autoPlay];

        return {
            plugins
        };
    }
});
</script>

<template>
    <main class="main-wrapper">
        <div class="main-title-wrapper">
            <div class="text-title">
                더티클리닉 <br />
                슬로건을 작성해주세요
            </div>
            <div class="main-button"></div>
        </div>

        <div class="main-first-wrapper">
            <div class="main-contents-wrapper">
                <div class="text-wrapper">
                    <span class="text-title">더티클리닉은 약속합니다.</span>
                    <span class="text-sub"
                        >여기에 서브 타이틀을 넣으려고 합니다. 원하는 문구가 있으신가요?</span
                    >
                </div>
                <div class="main-image-wrapper">
                    <div class="contents-wrapper">
                        <div class="contents">
                            <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                            <span
                                >첫번째 약속에 대한 <br />
                                설명을 여기에 작성합니다.</span
                            >
                        </div>
                        <div class="contents">
                            <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                            <span
                                >두번째 약속에 대한 <br />
                                설명을 여기에 작성합니다.</span
                            >
                        </div>
                        <div class="contents">
                            <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                            <span
                                >세번째 약속에 대한 <br />
                                설명을 여기에 작성합니다.</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-second-wrapper">
            <div class="main-contents-wrapper">
                <div class="text-wrapper">
                    <span class="text-title">더티클리닉의 대표서비스</span>
                    <span class="text-sub"
                        >여기에 서브 타이틀을 넣으려고 합니다. 원하는 문구 있으신가요?</span
                    >
                </div>
                <div class="contents-wrapper">
                    <div class="contents">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                        <div class="description">
                            <div class="description-text">
                                <span class="description-title">전문클리닉</span>
                                <span class="description-sub"
                                    >첫번째 약속에 대한 <br />
                                    첫번째 약속에 대한 설명을 여기에</span
                                >
                            </div>
                            <div class="description-button">
                                <span>more</span>
                            </div>
                        </div>
                    </div>
                    <div class="contents">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                        <div class="description">
                            <div class="description-text">
                                <span class="description-title">전문클리닉</span>
                                <span class="description-sub"
                                    >첫번째 약속에 대한 <br />
                                    첫번째 약속에 대한 설명을 여기에</span
                                >
                            </div>
                            <div class="description-button">
                                <span>more</span>
                            </div>
                        </div>
                    </div>
                    <div class="contents">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                        <div class="description">
                            <div class="description-text">
                                <span class="description-title">전문클리닉</span>
                                <span class="description-sub"
                                    >첫번째 약속에 대한 <br />
                                    첫번째 약속에 대한 설명을 여기에</span
                                >
                            </div>
                            <div class="description-button">
                                <span>more</span>
                            </div>
                        </div>
                    </div>
                    <div class="contents">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                        <div class="description">
                            <div class="description-text">
                                <span class="description-title">전문클리닉</span>
                                <span class="description-sub"
                                    >첫번째 약속에 대한 <br />
                                    첫번째 약속에 대한 설명을 여기에</span
                                >
                            </div>
                            <div class="description-button">
                                <span>more</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-promotion-wrapper">
            <div class="promotion-text-wrapper">
                <span class="text-sub">더티클리닉의 꺠끗함을 만나보세요.</span>
                <span class="text-main">프로모션 50%</span>
            </div>
        </div>
        <div class="main-slider-wrapper">
            <div class="slider-contents-wrapper">
                <div class="text-wrapper">
                    <div>
                        우리는 <br />
                        이렇게 <br />
                        보장합니다.
                    </div>
                </div>

                <Flicking class="flicking-wrapper" :plugins="plugins" :options="{ circular: true }">
                    <div class="flicking-panel">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                    </div>
                    <div class="flicking-panel">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                    </div>
                    <div class="flicking-panel">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                    </div>
                    <div class="flicking-panel">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                    </div>
                    <div class="flicking-panel">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                    </div>
                    <div class="flicking-panel">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                    </div>
                    <div class="flicking-panel">
                        <img src="@/assets/images/home/test-img1@x.jpg" alt="test" />
                    </div>
                </Flicking>
            </div>
        </div>
    </main>
</template>

<style scoped>
</style>
