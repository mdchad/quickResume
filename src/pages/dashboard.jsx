import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

import { Fragment, useState } from 'react'
import Steps from "@/components/Steps";
import {useRouter} from "next/router";
import SideNav from "@/components/SideNav";

export default function Dashboard() {
  const [result, setResult] = useState();
  const [professionInput, setProfessionInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [formSection, setFormSection] = useState('')

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profession: professionInput, skill: skillInput }),
    });
    const data = await response.json();
    console.log(data.result)
    setResult(data.result);
    setSkillInput("");
    setProfessionInput("");
  }

  return (
      <SideNav>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex">
          <div className="mt-16 w-full">
            <textarea className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" rows={30} value={result} />
          </div>

          <div className="mt-16 ml-10 w-full">
            <Steps setStep={setFormSection}/>
            <form action="#" className="grid grid-cols-1 gap-y-8 mt-12">
              <TextField
                  label="Add your profession"
                  id="profession"
                  name="profession"
                  type="text"
                  placeholder="Business analyst"
                  required
                  onChange={(e) => setProfessionInput(e.target.value)}
                  value={professionInput}
              />
              <TextField
                  label="Add your skills"
                  id="skills"
                  name="skills"
                  type="text"
                  placeholder="e.g Javascript, Excel"
                  required
                  onChange={(e) => setSkillInput(e.target.value)}
                  value={skillInput}
              />
              <div className="flex w-full">
                <Button
                    type="submit"
                    variant="solid"
                    color="blue"
                    className=""
                    onClick={onSubmit}
                >
                        <span>
                          Generate <span aria-hidden="true">&rarr;</span>
                        </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SideNav>
  )
}
