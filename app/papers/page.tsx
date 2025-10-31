"use client";

import { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Navigation from '../components/Navigation';
import Author from '../components/Author';
import Organizations from '../components/Organizations';
import ButtonWithIcon from '../components/ButtonWithIcon';
import CodeBlockWithCopyBtn from '../components/CodeBlockWithCopyBtn';
import styles from './page.module.css';

// BibTeX文本常量
const BIBTEX_TEXT = `@article{wu2025reinforcement,
  title={Reinforcement Learning with Adversarial Critic for Free-form Generations},
  author={Wu, Mian and Zhang, Gavin and Min, Sewon and Levine, Sergey and Kumar, Aviral},
  journal={arXiv preprint arXiv:tbd}, 
  year={2025},
  institution={Shanghai Jiao Tong University and University of California, Berkeley and Carnegie Mellon University},
  eprint={2510.12345},
  archivePrefix={arXiv},
  primaryClass={cs.LG}
}`;

const paperTitle = "RLAC: REINFORCEMENT LEARNING FROM DYNAMIC CRITIC FEEDBACK FOR FREE-FORM GENERATIONS";
const paperDescription = "RLAF trains a generator and a dynamic critic in an adversarial game, teaching the system to learn what deserves verification, and achieving scalable, prompt-specific, and verifiable RL post-training for free-form generation tasks.";
const paperAbstract = "Open-ended generation tasks require outputs to satisfy diverse and often implicit \
task-specific evaluation rubrics. The sheer number of relevant rubrics leads to \
prohibitively high verification costs and incomplete assessments of a response, \
making reinforcement learning (RL) post-training with rubric-based rewards difficult \
to scale. This problem is exacerbated by the fact that often the best way \
to combine these rubrics into one single reward is also highly prompt-specific. \
We propose Reinforcement Learning from Dynamic Critic Feedback (RLAC), \
a post-training approach that addresses these challenges via dynamic rubric verification. \
Our approach employs a large language model (LLM) as a critic that \
dynamically identifies only the most likely failure modes (e.g., a factual error or \
unhandled edge case), which are then verified by an external validator to optimize \
both generator and critic jointly. By training both the generator and the critic, \
this game enhances the critic’s error detection and the generator’s output quality \
while reducing required verifications. Our experiments demonstrate that RLAC \
improves factual accuracy in text generation and correctness in code generation, \
while also outperforming exhaustive verification and reward model methods. We \
show that dynamic critics are more effective than fixed critics, showcasing the \
potential of RLAC for scaling RL post-training to free-form generation tasks."

export default function Paper() {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  
  const handleCodeClick = () => {
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className={styles.paperContainer}>
        <div className={styles.paperTitle}>
            <div>{paperTitle}</div>
        </div>
        <div className={styles.paperAuthors}>
          <div className={styles.peopleList}>
            <Author name="Mian Wu" superscript="†1"/>
            <Author name="Gavin Zhang" superscript="2"/>
            <Author name="Sewon Min" superscript="2" link='https://www.sewonmin.com/'/>
            <Author name="Sergey Levine" superscript="2" link='https://people.eecs.berkeley.edu/~svlevine/'/>
            <Author name="Aviral Kumar" superscript="3" link="https://aviralkumar2907.github.io/"/>
          </div>
          <div className={styles.organizationList}>
            <Organizations superscript={1} organizations={["Shanghai Jiao Tong University"]} />
            <Organizations superscript={2} organizations={["University of California","Berkeley"]} />
            <Organizations superscript={3} organizations={["Carnegie Mellon University"]} />
          </div>
        </div>
        <div className={styles.relatedLinks}>
          <ButtonWithIcon 
            text="paper" 
            iconUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ctext x='0' y='16' font-size='16'%3E%F0%9F%93%84%3C/text%3E%3C/svg%3E" 
          />
          <ButtonWithIcon
            text="code" 
            iconUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff' width='20' height='20'%3E%3Cpath d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'/%3E%3C/svg%3E"
            onClick={handleCodeClick}
            />
          <ButtonWithIcon text="slides" iconUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ctext x='0' y='16' font-size='16'%3E%F0%9F%93%91%3C/text%3E%3C/svg%3E" />
        </div>
        <div className={styles.paperAbstract}>
            <div>
              <div style={{fontSize: '1.5rem', fontWeight: 600}}>TL;DR</div>
              <div>
                {paperDescription}
              </div>
            </div>
            <div>Abstract</div>
            <div>{paperAbstract}</div>
          <div className={styles.videosGrid}>
            <div className={styles.videoItem}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className={styles.video}
                preload="auto"
              >
                <source src="/helloNextJs/videos/A-7.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <text>Enumerative Method</text>
            </div>
            <div className={styles.videoItem}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className={styles.video}
                preload="auto"
              >
                <source src="/helloNextJs/videos/B-7.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <text>Reward Model</text>
            </div>
            <div className={styles.videoItem}>
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className={styles.video}
                preload="auto"
              >
                <source src="/helloNextJs/videos/C-7.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <text>RLAC</text>
            </div>
          </div>
        </div>
        <div className={styles.paperEvaluation}>
        <div>Evaluation</div>
        <div className={styles.evaluationDescriptions}>
          Performance comparison on factual text generation. RLAC achieves the highest FactScore across all settings while using fewer verification calls than FactTune-FS.
        </div>
        <div className={styles.evaluationImages}>
          <img src="/helloNextJs/images/eval_res1.png" alt="Evaluation 1" className={`${styles.evalImage} ${styles.evalImageSmall}`} />
        </div>
        <div className={styles.evaluationDescriptions}>
          RLAC achieves the highest factuality scores across model sizes and output lengths, while using significantly fewer verification calls. For instance, on Qwen3-8B with eight-sentence generation, it reaches a FactScore of 0.889, outperforming FactTune-FS (0.867) and ArmoRM (0.723), but with only 77k verification calls compared to 439k for FactTune-FS. This efficiency gap grows with output length: FactTune-FS requires 4.4× more verification calls in the four-sentence setting (169k vs. 39k) and 5.7× more in the eight-sentence setting (439k vs. 77k). This shows that RLAC scales more efficiently as the generation complexity increases.
        </div>
        <div className={styles.evaluationImages}>
          <img src="/helloNextJs/images/eval_res2.png" alt="Evaluation 2" className={styles.evalImage} />
        </div>
        <div className={styles.evaluationDescriptions}>
          Average validator outcomes on suspicious facts proposed by the critic during factual biography generation. Higher values indicate that the critic more often misjudges correct facts (i.e., weaker supervision).
        </div>
        <div className={styles.evaluationImages}>
          <img src="/helloNextJs/images/eval_res3.png" alt="Evaluation 3" className={`${styles.evalImage} ${styles.evalImageSmall}`} />
        </div>
        <div className={styles.evaluationDescriptions}>
          Despite training on only 2,000 problems (9% of the dataset used for AceCoder-RM and AceCoder-Rule), RLAC achieves the highest average scores: 53.2 using Qwen2.5-Coder-7B-Base and 56.6 using Qwen2.5- Coder-7B-Instruct, consistently outperforming both enumerative method (AceCoder-Rule) and static reward model method (AceCoder-RM) across the majority of benchmarks. We observe from Table 4 that AceCoder-RM not only fails to improve performance but can even degrade it under noisy validation. For example, on HumanEval, performance drops from 91.5 to 89.0 despite using the competetive reward model Acecoder-RM-7B, indicating reward hacking.
        </div>
        <div className={styles.evaluationImages}>
          <img src="/helloNextJs/images/eval_res4.png" alt="Evaluation 4" className={styles.evalImage} />
        </div>
        </div>


        <div className={styles.paperReference}>
            <div>Reference</div>
            <CodeBlockWithCopyBtn code={BIBTEX_TEXT} />
        </div>

        {/* Custom Modal */}
        {showModal && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalBody}>
                <div className={styles.comingSoonText}>Coming Soon</div>
                <p>The code will be available soon. Please check back later!</p>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.modalButton} onClick={closeModal}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
