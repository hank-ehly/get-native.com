/**
 * feature-description.service
 * get-native.com
 *
 * Created by henryehly on 2016/11/06.
 */

import { Injectable } from '@angular/core';
import { FeatureDescription } from './feature-description';

@Injectable()
export class FeatureDescriptionService {
    getLargeFeatureDescriptions(): FeatureDescription[] {
        return [
            {
                title: 'Video database',
                paragraphs: [
                    `Get native is all about breaking the barrier between fluid speech and native like speech. Our way 
                    of breaking the barrier is through intensive observation, pronunciation practice and active learning 
                    using video interviews of native speakers. Needless to say in order for this to work we need a lot 
                    of interview videos!`,
                    `The get native video database currently contains X video interviews in English and Japanese, and we 
                    will continue to add more. The interviews are all related to things innately interesting to language 
                    learners and those interested in other cultures. Have an idea for an interesting topic? We'd love to 
                    hear what you think.`
                ],
                thumbnail: 'feature01.jpg'
            },
            {
                title: 'Study like the pros',
                paragraphs: [
                    `Wouldn't it be awesome to have an intense language study session in 15 minutes, or even 10? If 
                    you're an Advanced learner of the language you may already have your own study routine. But that 
                    study routine might include getting out books, scrolling through web pages -- it could take up to 10
                    minutes just to get all the materials ready!`,
                    `Get native offers study sessions, which are kind of like an app inside an app. Once you find a 
                    video that you'd like to study, specify the amount of time that you'd like to study and Get Native 
                    will guide you through a study routine designed to help you improve your pronunciation in fluidity 
                    in the target language.`],
                thumbnail: 'feature02.jpg'
            },
            {
                title: 'A tool for advanced language learners',
                paragraphs: [
                    `Get Native is most useful to language learners who already have a good command of the target 
                    language, yet want to make the speech sound more like that of a native speaker. Finding good study 
                    material is easy when you've just set out learning the target language. But as you advance, every 
                    day material like newspapers, journal articles, TV, podcasts and conversations with other speakers
                    might become the core of your study routine.`,
                    `As a language learner myself, I often wished they were more language learning materials focused on 
                    native like pronunciation and vocabulary use. Get native gives you the tools that you need to sound 
                    more native-like and use more natural phrases and collocations.`],
                thumbnail: 'feature03.jpg'
            }
        ];
    }

    getSmallFeatureDescriptions(): FeatureDescription[] {
        return <FeatureDescription[]>[
            {
                title: 'Perfect for polyglots',
                paragraphs: [
                    `No need to clutter your desk with study materials in multiple languages. Blaze through study 
                    sessions in multiple languages.`],
                thumbnail: 'globe.svg'
            },
            {
                title: 'Open-source',
                paragraphs: [`See the magic happening under the hood on our GitHub page. Pull requests and contributions welcome!`],
                thumbnail: 'padlock.svg'
            },
            {
                title: 'Better security',
                paragraphs: [`We take your private information seriously. Get Native uses encryption to protect your data.`],
                thumbnail: 'check-shield.svg'
            },
            {
                title: 'Easy-to-use interface',
                paragraphs: [`Our designers work hard to design simple and intuitive user interfaces.`],
                thumbnail: 'check-badge.svg'
            },
            {
                title: 'Support',
                paragraphs: [`Questions or feedback? Drop us an email. We’d love to help out in anyway we can.`],
                thumbnail: 'support.svg'
            },
            {
                title: 'Simple registration',
                paragraphs: [`Don't want to keep track of another password? Create an account in seconds with Facebook or Gmail.`],
                thumbnail: 'registration.svg'
            }
        ];
    }
}
