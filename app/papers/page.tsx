"use client";

import { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Navigation from '../components/Navigation';
import Author from '../components/Author';
import Organizations from '../components/Organizations';
import ButtonWithIcon from '../components/ButtonWithIcon';
import styles from './page.module.css';

// BibTeX文本常量
const BIBTEX_TEXT = `@inproceedings{zhang2024openworld,
  title={Open-World Reinforcement Learning over Long Short-Term Imagination},
  author={Zhang, Yuxin and Li, Yao and Chen, Tianyi and Zhang, Rui and Song, Shuyang and Wang, Yaliang and Song, Linfeng and Song, Dacheng and Zhang, Changshui},
  booktitle={International Conference on Learning Representations},
  year={2024}
}`;

const paperTitle = "RLDCF: REINFORCEMENT LEARNING FROM DYNAMIC CRITIC FEEDBACK FOR FREE-FORM GENERATIONS";
const paperDescription = "RLDCF formulates the problem as an adversarial game between a generator and a critic. The critic is a learned model that proposes a rubric where the generator’s output is likely to fail, and an external validator verifies this. Both models are trained jointly: the critic is rewarded when it correctly pinpoints a rubric that the generator fails, while the generator is rewarded when the critic is unable to do so.";
const paperAbstract = "Open-ended generation tasks require outputs to satisfy diverse and often implicit \
task-specific evaluation rubrics. The sheer number of relevant rubrics leads to \
prohibitively high verification costs and incomplete assessments of a response, \
making reinforcement learning (RL) post-training with rubric-based rewards difficult \
to scale. This problem is exacerbated by the fact that often the best way \
to combine these rubrics into one single reward is also highly prompt-specific. \
We propose Reinforcement Learning from Dynamic Critic Feedback (RLDCF), \
a post-training approach that addresses these challenges via dynamic rubric verification. \
Our approach employs a large language model (LLM) as a critic that \
dynamically identifies only the most likely failure modes (e.g., a factual error or \
unhandled edge case), which are then verified by an external validator to optimize \
both generator and critic jointly. By training both the generator and the critic, \
this game enhances the critic’s error detection and the generator’s output quality \
while reducing required verifications. Our experiments demonstrate that RLDCF \
improves factual accuracy in text generation and correctness in code generation, \
while also outperforming exhaustive verification and reward model methods. We \
show that dynamic critics are more effective than fixed critics, showcasing the \
potential of RLDCF for scaling RL post-training to free-form generation tasks."

export default function Paper() {
  const { t } = useLanguage();
  return (
    <div className={styles.paperContainer}>
        <div className={styles.paperTitle}>
            <div>{paperTitle}</div>
        </div>
        <div className={styles.paperAuthors}>
          <div className={styles.peopleList}>
            <Author name="Mian Wu" superscript="†1" link='https://www.baidu.com'/>
            <Author name="Gavin Zhang" superscript="2"/>
            <Author name="Sewon Min" superscript="2" />
            <Author name="Sergey Levine" superscript="2" />
            <Author name="Aviral Kumar" superscript="3" />
          </div>
          <div className={styles.organizationList}>
            <Organizations superscript={1} organizations={["Shanghai Jiao Tong University"]} />
            <Organizations superscript={2} organizations={["University of California","Berkeley"]} />
            <Organizations superscript={3} organizations={["Carnegie Mellon University"]} />
          </div>
        </div>
        <div className={styles.relatedLinks}>
          <ButtonWithIcon text="paper" iconUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ctext x='0' y='16' font-size='16'%3E%F0%9F%93%84%3C/text%3E%3C/svg%3E" />
          <ButtonWithIcon text="code" iconUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ctext x='0' y='16' font-size='16'%3E%F0%9F%92%BB%3C/text%3E%3C/svg%3E" />
          <ButtonWithIcon text="slides" iconUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ctext x='0' y='16' font-size='16'%3E%F0%9F%93%91%3C/text%3E%3C/svg%3E" />
        </div>
        <div className={styles.paperAbstract}>
            <div>
                {paperDescription}
            </div>
            <div>Abstract</div>
            <div>{paperAbstract}</div>
        </div>
        <div className={styles.paperEvaluation}>
            <div>{t('paper.evaluation')}</div>
            <div className={styles.evaluationImages}>
                {/* <img src="/images/paper_eval3.png" alt="Evaluation 3" className={styles.evalImage}/> */}
            </div>
        </div>
        <div className={styles.paperBibtex}>
            <div className={styles.bibtexHeader}>
                <span>{t('paper.bibtex')}</span>
                {/* <CopyButton /> */}
            </div>
            <div className={styles.codeBlock}>
                <pre className={styles.bibtexCode}>
                    <code>{BIBTEX_TEXT}</code>
                </pre>
            </div>
        </div>    
    </div>
  );
}
